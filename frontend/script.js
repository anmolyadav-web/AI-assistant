const api = '/api';

async function postJSON(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

async function generateVivaQuestion() {
  const topic = document.getElementById('viva-topic').value.trim();
  const output = document.getElementById('viva-output');
  output.textContent = 'Generating question...';

  try {
    const data = await postJSON(`${api}/viva/question`, { topic });
    document.getElementById('viva-question').value = data.question;
    output.textContent = 'Question generated successfully.';
  } catch (error) {
    output.textContent = error.message;
  }
}

async function submitVivaAnswer() {
  const question = document.getElementById('viva-question').value.trim();
  const answer = document.getElementById('viva-answer').value.trim();
  const output = document.getElementById('viva-output');
  output.textContent = 'Evaluating answer...';

  try {
    const data = await postJSON(`${api}/viva/evaluate`, { question, answer });
    output.textContent = data.evaluation;
  } catch (error) {
    output.textContent = error.message;
  }
}

async function generateNotes() {
  const lecture = document.getElementById('notes-lecture').value.trim();
  const file = document.getElementById('notes-file').files[0];
  const output = document.getElementById('notes-output');
  output.textContent = 'Generating notes...';

  try {
    let response;
    if (file) {
      const formData = new FormData();
      formData.append('lecture', lecture);
      formData.append('file', file);
      response = await fetch(`${api}/notes`, { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Request failed');
      output.textContent = data.notes;
      return;
    }

    const data = await postJSON(`${api}/notes`, { lecture });
    output.textContent = data.notes;
  } catch (error) {
    output.textContent = error.message;
  }
}

async function runProfessorMode() {
  const syllabus = document.getElementById('prof-syllabus').value.trim();
  const previous_papers = document.getElementById('prof-papers').value.trim();
  const notes = document.getElementById('prof-notes').value.trim();
  const output = document.getElementById('prof-output');
  output.textContent = 'Analyzing data...';

  try {
    const data = await postJSON(`${api}/professor`, { syllabus, previous_papers, notes });
    output.textContent = data.insights;
  } catch (error) {
    output.textContent = error.message;
  }
}
