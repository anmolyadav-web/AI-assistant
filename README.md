# AI Academic Assistant 🎓

A web platform that helps university students prepare for exams, lectures, and viva using AI.

## Features

- **AI Viva Simulator**
  - Generate one viva question at a time
  - Submit answer for scoring, feedback, and ideal answer
- **Lecture Notes Generator**
  - Paste lecture text and generate structured notes
  - Optional PDF upload support
- **Professor Mode (Exam Predictor)**
  - Analyze syllabus, previous papers, and notes
  - Get likely exam/viva questions and revision guidance

## Tech Stack

- Frontend: HTML, CSS, JavaScript (Fetch API)
- Backend: Node.js, Express.js
- AI: Gemini API
- Optional: `pdf-parse`, `multer`

## Folder Structure

```text
ai-academic-assistant
│
├── frontend
│   ├── index.html
│   ├── viva.html
│   ├── notes.html
│   ├── professor.html
│   ├── style.css
│   └── script.js
│
├── backend
│   ├── server.js
│   ├── gemini.js
│   └── routes
│        ├── viva.js
│        ├── notes.js
│        └── professor.js
│
├── package.json
└── README.md
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

3. Run server:
   ```bash
   npm start
   ```
4. Open app at `http://localhost:3000`


## API Endpoints

- `POST /api/viva/question`
- `POST /api/viva/evaluate`
- `POST /api/notes`
- `POST /api/professor`

