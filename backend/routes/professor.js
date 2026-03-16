const express = require('express');
const { generateWithGemini } = require('../gemini');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { syllabus, previous_papers, notes } = req.body;
    if (!syllabus || !previous_papers || !notes) {
      return res.status(400).json({ error: 'syllabus, previous_papers, and notes are required' });
    }

    const prompt = `You are an experienced university professor.\n\nAnalyze the following academic material:\n\nSYLLABUS:\n${syllabus}\n\nPREVIOUS YEAR QUESTION PAPERS:\n${previous_papers}\n\nLECTURE NOTES:\n${notes}\n\nYour task is to predict exam preparation insights.\n\nProvide:\n\n1. Most Important Topics\n2. Highly Probable Exam Questions (5 questions)\n3. Likely Viva Questions (5 questions)\n4. High Scoring Answer Structure for 2 important questions\n5. Quick Revision Points\n\nMake the output clear and structured for students.`;

    const response = await generateWithGemini(prompt);
    return res.json({ insights: response.trim() });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
