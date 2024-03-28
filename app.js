const express = require('express')
const app = express()
require('dotenv').config()

const Contribution = require('./models/ContributionSchema')
const { subMonths } = require('date-fns/subMonths')

const cors = require('cors') // to allow access to other domains
const helmet = require('helmet') // sets various HTTP headers to prevent numerous possible attacks.
const xss = require('xss-clean') // Sanitizes the user input in req.body, and headers to protects us from cross-site-scripting attacks

// Set up CORS options to allow requests from any origin
// const corsOptions = {
//   origin: '*', // Allow requests from any origin
//   methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Specify the allowed HTTP methods
// }
app.use(helmet())
// enable cors
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
)
app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
)

// For logs we can use morgan package
const morgan = require('morgan')
const connectDB = require('./connectdb')

app.use(morgan('tiny'))

app.use(express.json())

app.get('/contributions', async (req, res) => {
  const contributions = await Contribution.find()
  const response = contributions.map((contribution, index) => ({
    uuid: contribution._id,
    status: contribution.status,
    tfsa: contribution.tfsa,
    rrsp: contribution.rrsp,
    total: contribution.tfsa + contribution.rrsp,
    date: subMonths(new Date(), index).toISOString(),
  }))
  res.status(200).json(response)
})

// PATCH route to update the status of a contribution by UUID
app.delete('/contribution/:uuid', async (req, res) => {
  const uuid = req.params.uuid

  try {
    const updatedContribution = await Contribution.findOneAndDelete(
      { _id: uuid } // Filter criteria: Find contribution by UUID
    )

    if (!updatedContribution) {
      return res.status(404).json({ error: 'Contribution not found' })
    }

    res.status(202).json({ message: `Successfully delete ${uuid}` })
  } catch (error) {
    console.error('Error updating contribution:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Use only if you need to insert many contributions at once (Used to populate the data initially)
app.post('/contributions', async (req, res) => {
  try {
    const contributions = req.body // Assuming the request body contains a contributions array

    // Remove existing contributions before inserting new ones
    await Contribution.deleteMany({})

    const createdContributions = await Contribution.insertMany(contributions)
    res.status(201).json(createdContributions)
  } catch (error) {
    console.error('Error creating bulk contributions:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// app.use('*', (req, res) => {
//   res.status(400).send('Route not found')
// })

const port = process.env.PORT || 8000

const start = async () => {
  try {
    await connectDB(process.env.mongo_uri)
    const server = app.listen(
      port,
      console.log(`Server is listening on the port ${port}`)
    )
    // For AWS Elastic Bean not to fail on timeout
    server.keepAliveTimeout = 61 * 1000
    server.headersTimeout = 65 * 1000 // This should be bigger than `keepAliveTimeout + your server's expected response time`
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1) // Exit the process with an error code
  }
}

start()
