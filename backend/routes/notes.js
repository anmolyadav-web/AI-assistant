const express = require('express');
const multer = require('multer');
const { buildNotesResponse } = require('../services/notesService');
const { parsePdfText } = require('../utils/pdf');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    let lecture = req.body.lecture || '';

    if (req.file) {
      const pdfText = await parsePdfText(req.file.buffer);
      lecture = `${lecture}\n${pdfText}`.trim();
    }

    if (!lecture) {
      return res.status(400).json({ error: 'lecture text or PDF file is required' });
    }

    const notes = await buildNotesResponse(lecture);
    return res.json({ notes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
