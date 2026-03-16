require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'ALzaSyD-5GA4BCQTBGhzfn4DSfpR8q8Q3dOPPUU';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

async function generateWithGemini(prompt) {
  if (!GEMINI_API_KEY) {
    return `Demo mode (no GEMINI_API_KEY configured).\n\n${mockResponse(prompt)}`;
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
}

function mockResponse(prompt) {
  if (prompt.includes('strict university professor conducting a viva')) {
    return 'What is the principle of operation of a Zener diode in reverse bias?';
  }
  if (prompt.includes('evaluating a student\'s viva answer')) {
    return `Score: 7/10\n\nFeedback:\n- Correctly explains breakdown behavior.\n- Misses voltage regulation application details.\n- Improve by mentioning Zener and avalanche effects.\n\nCorrect Answer:\nA Zener diode operates in reverse breakdown at a nearly constant voltage, allowing it to regulate output voltage in circuits.`;
  }
  if (prompt.includes('creating study notes')) {
    return `1. Title of Topic\nSemiconductor Diodes and Applications\n\n2. Key Definitions\n- PN Junction\n- Reverse Breakdown\n\n3. Important Concepts\n- Forward and reverse bias\n- Zener regulation\n\n4. Important Formulas\n- Vout ≈ Vz (Zener regulator)\n\n5. Bullet Point Summary\n- Diodes allow unidirectional current flow.\n- Zener diodes stabilize voltage.\n\n6. Possible Exam Questions\n1) Explain Zener breakdown.\n2) Compare rectifier vs regulator.\n3) Design a simple regulator.`;
  }
  return `1. Most Important Topics\n- Core syllabus concepts with high recurrence\n\n2. Highly Probable Exam Questions\n1) Explain key principle A\n2) Derive expression B\n3) Compare method C and D\n4) Solve numerical from topic E\n5) Discuss applications of F\n\n3. Likely Viva Questions\n1) Define concept A\n2) Why is B important?\n3) What if condition C changes?\n4) Explain practical use of D\n5) Common mistakes in E?\n\n4. High Scoring Answer Structure\n- Definition -> Principle -> Diagram -> Formula -> Example -> Conclusion\n\n5. Quick Revision Points\n- Memorize formulas and assumptions\n- Practice 5 previous year problems per unit`;
}

module.exports = { generateWithGemini };
