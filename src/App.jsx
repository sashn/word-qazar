import { useEffect, useState } from 'react';

function App() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');

  useEffect(() => {
    loadWords();
  }, []);

  async function loadWords() {
    const res = await fetch('/api/words');
    const data = await res.json();
    setWords(data);
  }

  async function addWord() {
    await fetch('/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word, meaning })
    });
    setWord('');
    setMeaning('');
    loadWords();
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Enter word</h1>
      <input
        placeholder="libro"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <input
        placeholder="book"
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
      />
      <button onClick={addWord}>Add</button>

      <h2>Saved words</h2>
      <ul>
        {words.map((w) => (
          <li key={w.id}>
            {w.word} → {w.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
