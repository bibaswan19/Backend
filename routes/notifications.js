const express = require('express');
const router = express.Router();
const controller = require('../controllers/notificationController');

router.get('/', controller.getNotifications);
router.post('/', controller.createNotification);
router.put('/:id', controller.updateNotification);
router.delete('/:id', controller.deleteNotification);
router.get('/:id/pdf', controller.downloadPdf); // for generating PDF from content

module.exports = router;
