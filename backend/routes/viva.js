const express = require('express');
const { generateWithGemini } = require('../gemini');

const router = express.Router();

router.post('/question', async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'topic is required' });
    }

    const prompt = `You are a strict university professor conducting a viva examination.\n\nTopic: ${topic}\n\nYour job is to:\n1. Ask ONE viva question at a time.\n2. The question should test conceptual understanding.\n3. Keep the difficulty appropriate for undergraduate students.\n\nRules:\n- Do NOT explain the answer.\n- Only ask the question.\n- Make the question short and clear.`;

    const response = await generateWithGemini(prompt);
    return res.json({ question: response.trim() });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/evaluate', async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'question and answer are required' });
    }

    const prompt = `You are evaluating a student's viva answer.\n\nQuestion:\n${question}\n\nStudent Answer:\n${answer}\n\nEvaluate the answer and return:\n\nScore: (out of 10)\n\nFeedback:\n- What the student explained correctly\n- What they missed\n- How they can improve\n\nCorrect Answer:\nProvide a short ideal answer a professor expects.`;

    const response = await generateWithGemini(prompt);
    return res.json({ evaluation: response.trim() });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
