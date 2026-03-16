async function parsePdfText(buffer) {
  const pdf = require('pdf-parse');
  const parsed = await pdf(buffer);
  return parsed.text || '';
}

module.exports = { parsePdfText };
