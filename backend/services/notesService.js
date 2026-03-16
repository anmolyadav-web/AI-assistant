const { generateWithGemini } = require('../gemini');

async function buildNotesResponse(lecture) {
  const prompt = `You are an expert university professor creating study notes.\n\nConvert the following lecture content into structured academic notes.\n\nLecture Content:\n${lecture}\n\nOutput format:\n\n1. Title of Topic\n\n2. Key Definitions\n\n3. Important Concepts\n\n4. Important Formulas (if any)\n\n5. Bullet Point Summary\n\n6. Possible Exam Questions (3 questions)`;

  const response = await generateWithGemini(prompt);
  return response.trim();
}

module.exports = { buildNotesResponse };
