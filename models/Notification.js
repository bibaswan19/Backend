const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now, // ✅ This ensures current date/time is saved
  },
  pdfLink: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
