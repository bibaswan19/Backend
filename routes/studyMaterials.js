const express = require('express');
const router = express.Router();
const controller = require('../controllers/studyMaterialController');

router.get('/', controller.getStudyMaterials);
router.post('/', controller.createStudyMaterial);
router.put('/:id', controller.updateStudyMaterial);
router.delete('/:id', controller.deleteStudyMaterial);
router.get('/:id/pdf', controller.downloadPdf);

module.exports = router;
