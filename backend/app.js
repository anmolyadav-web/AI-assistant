const path = require('path');
const express = require('express');
const cors = require('cors');

const vivaRoutes = require('./routes/viva');
const notesRoutes = require('./routes/notes');
const professorRoutes = require('./routes/professor');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use('/api/viva', vivaRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/professor', professorRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
