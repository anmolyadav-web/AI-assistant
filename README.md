# AI Academic Assistant 🎓

A web platform that helps university students prepare for exams, lectures, and viva using AI.

## Features
- AI Viva Simulator
- Lecture Notes Generator (text + optional PDF)
- Professor Mode (exam predictor)

## Quick Start
1. `npm install`
2. `cp .env.example .env`
3. Add your `GEMINI_API_KEY` in `.env` (optional; demo mode works without it)
4. `npm start`

## API Endpoints
- `POST /api/viva/question`
- `POST /api/viva/evaluate`
- `POST /api/notes`
- `POST /api/professor`
- `GET /health`

## Deployment (Vercel)
- API entrypoint: `api/index.js`
- Static frontend: `frontend/*`
- Routing config: `vercel.json`

## Merge-Conflict Note
If your PR shows conflicts in `README.md`, `backend/server.js`, `backend/routes/notes.js`, `package.json`, or `vercel.json`, rebase your branch on the latest target branch before merging:

```bash
git fetch origin
git rebase origin/main
# resolve files
git add <files>
git rebase --continue
git push --force-with-lease
```
