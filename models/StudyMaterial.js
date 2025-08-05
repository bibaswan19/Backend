const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  pdfLink: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
