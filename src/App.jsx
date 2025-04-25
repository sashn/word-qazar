import { useState, useEffect } from 'react';

export default function App() {
  const [language, setLanguage] = useState('de');
  const [phrase, setPhrase] = useState('');
  const [translation, setTranslation] = useState('');
  const [phrases, setPhrases] = useState([]);

  useEffect(() => {
    fetch('/api/words')
      .then((res) => res.json())
      .then(setPhrases)
      .catch(console.error);
  }, []);

  const handleSubmit = async () => {
    if (!phrase || !translation) return;
    const newEntry = { word: phrase, meaning: translation };
    const res = await fetch('/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry),
    });
    const data = await res.json();
    setPhrases((prev) => [...prev, ...data]);
    setPhrase('');
    setTranslation('');
  };

  return (
    <div className="max-w-md mx-auto p-4 text-sm">
      <h1 className="text-2xl font-bold text-center mb-4">Word-Qazar</h1>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Sprache</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="de">🇩🇪 Deutsch</option>
          <option value="en">🇺🇸 Englisch</option>
          <option value="fr">🇫🇷 Französisch</option>
        </select>
      </div>

      <div className="mb-2">
        <textarea
          rows="2"
          placeholder="Phrase"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          className="w-full border rounded px-2 py-1 resize-none"
        />
      </div>

      <div className="mb-2">
        <textarea
          rows="2"
          placeholder="Übersetzung"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          className="w-full border rounded px-2 py-1 resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded mb-6"
      >
        Speichern
      </button>

      <div className="space-y-2">
        {phrases.map((entry, i) => (
          <div key={i} className="border p-3 rounded shadow-sm bg-gray-50">
            <div className="font-bold">{entry.word}</div>
            <div>{entry.meaning}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
