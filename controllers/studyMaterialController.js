const StudyMaterial = require('../models/StudyMaterial');
const generatePdfBuffer = require('../utils/generatePdfBuffer');

exports.getStudyMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({ dateTime: -1 });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createStudyMaterial = async (req, res) => {
  try {
    const { title, dateTime, pdfLink, content } = req.body;

    const newMaterial = new StudyMaterial({
      title,
      dateTime,
      pdfLink: pdfLink || undefined,
      content: content || undefined,
    });

    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

exports.updateStudyMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, dateTime, pdfLink, content } = req.body;

    const updated = await StudyMaterial.findByIdAndUpdate(
      id,
      { title, dateTime, pdfLink, content },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Not found' });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
};

exports.deleteStudyMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await StudyMaterial.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed' });
  }
};

exports.downloadPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await StudyMaterial.findById(id);
    if (!material || !material.content) {
      return res.status(404).json({ message: 'PDF content not found' });
    }

    const buffer = await generatePdfBuffer(material.content);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${material.title}.pdf"`,
    });
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ message: 'PDF generation failed' });
  }
};
