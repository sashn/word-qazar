async function addWord() {
  const word = document.getElementById('word').value;
  const meaning = document.getElementById('meaning').value;
  await fetch('/api/words', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word, meaning })
  });
  loadWords();
}

async function loadWords() {
  const res = await fetch('/api/words');
  const data = await res.json();
  const list = document.getElementById('list');
  list.innerHTML = '';
  data.forEach(v => {
    const li = document.createElement('li');
    li.textContent = `${v.word} → ${v.meaning}`;
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addBtn').addEventListener('click', addWord);
  loadWords();
});
