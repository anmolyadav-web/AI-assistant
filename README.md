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
2. Create `.env` file from `.env.example` (optional for real AI responses):
   ```bash
   cp .env.example .env
   ```
   Then set your real key in `.env`.
3. Run server:
   ```bash
   npm start
   ```
4. Open app at `http://localhost:3000`

> If no `GEMINI_API_KEY` is set, the app runs in demo mode with mock AI responses.

## API Endpoints

- `POST /api/viva/question`
- `POST /api/viva/evaluate`
- `POST /api/notes`
- `POST /api/professor`

## Troubleshooting Merge Conflicts

If GitHub/Git shows merge conflicts for this project, run these commands from your feature branch:

```bash
git fetch origin
git rebase origin/main
```

If conflicts appear:

```bash
# open conflicted files and keep the correct final content
git add <resolved-files>
git rebase --continue
```

If your local branch accidentally tracked generated/local files, untrack and recommit:

```bash
git rm -r --cached node_modules .env 2>/dev/null || true
git add .gitignore .env.example
git commit -m "chore: stop tracking local files"
```

Then push safely:

```bash
git push --force-with-lease
```


## Deploy on Vercel (Fix for 404 NOT_FOUND)

If Vercel shows `404: NOT_FOUND`, make sure:

1. `vercel.json` exists in repo root and routes API traffic to `api/index.js` while serving `frontend/*` as static files.
2. In Vercel Project Settings, add env var: `GEMINI_API_KEY` (and optional `GEMINI_MODEL`).
3. Redeploy after pushing latest commit.

This repo now includes a Vercel config and serverless-safe Express export (`module.exports = app` when `VERCEL` is set).



### If Vercel shows "FUNCTION_INVOCATION_FAILED"

- Make sure Project Settings → Node.js version is **18+** (or leave default latest).
- Ensure env vars are set in Vercel: `GEMINI_API_KEY` (optional), `GEMINI_MODEL` (optional).
- Redeploy after pulling latest code.

This repo now exports the Express app in a serverless-safe way (`module.exports = app`) and only calls `app.listen(...)` when run directly in local Node.


- Merge helper: `.gitattributes` sets `README.md merge=union` to reduce README-only merge conflicts.
