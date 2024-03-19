const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const ContributionSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['PENDING', 'CANCELLED', 'PROCESSED'], // Define the enum options
    default: 'PENDING', // Set a default value
  },
  tfsa: Number,
  rrsp: Number,
})

ContributionSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.uuid = ret._id
    // _id is still created on DB. It will just be transformed to uuid in the response. Also, we are deleting that _id and _v from response as we don't use them
    delete ret._id
    delete ret.__v
  },
})

module.exports = mongoose.model('Contribution', ContributionSchema)
