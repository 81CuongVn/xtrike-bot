const mongoose = require('mongoose')

/** The schema of the Snipes collection */
const schema = new mongoose.Schema({
  _id: String,
  d: mongoose.Mixed
}, { versionKey: false })

module.exports = mongoose.model('snipes', schema)
