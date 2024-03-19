const mongoose = require('mongoose')

const connectDB = (connectionString) => {
  console.log('Connecting to the DB...')
  mongoose
    .connect(connectionString)
    .then(() => console.log('Connected to the DB...'))
    .catch((err) => console.log(err))
}

module.exports = connectDB
