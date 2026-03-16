const express = require('express');
const multer = require('multer');
const { generateWithGemini } = require('../gemini');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    let lecture = req.body.lecture || '';

    if (req.file) {
      const pdf = require('pdf-parse');
      const parsed = await pdf(req.file.buffer);
      lecture = `${lecture}\n${parsed.text}`.trim();
    }

    if (!lecture) {
      return res.status(400).json({ error: 'lecture text or PDF file is required' });
    }

    const prompt = `You are an expert university professor creating study notes.\n\nConvert the following lecture content into structured academic notes.\n\nLecture Content:\n${lecture}\n\nOutput format:\n\n1. Title of Topic\n\n2. Key Definitions\n\n3. Important Concepts\n\n4. Important Formulas (if any)\n\n5. Bullet Point Summary\n\n6. Possible Exam Questions (3 questions)`;

    const response = await generateWithGemini(prompt);
    return res.json({ notes: response.trim() });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
