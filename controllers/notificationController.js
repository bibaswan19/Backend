const Notification = require('../models/Notification');
const generatePdfBuffer = require('../utils/generatePdfBuffer');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ datetime: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { title, datetime, pdfLink, content } = req.body;

    const newNotification = new Notification({
      title,
      datetime,
      pdfLink: pdfLink || undefined,
      content: content || undefined,
    });

    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, datetime, pdfLink, content } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { title, datetime, pdfLink, content },
      { new: true }
    );

    if (!notification) return res.status(404).json({ message: 'Not found' });

    res.json(notification);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notification.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed' });
  }
};

exports.downloadPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification || !notification.content) {
      return res.status(404).json({ message: 'PDF content not found' });
    }

    const buffer = await generatePdfBuffer(notification.content);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${notification.title}.pdf"`,
    });
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ message: 'PDF generation failed' });
  }
};
