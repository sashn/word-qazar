// api/words.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('words').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  if (req.method === 'POST') {
    const { word, meaning } = req.body;
    const { data, error } = await supabase.from('words').insert([{ word, meaning }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  res.status(405).end(); // Method not allowed
}

module.exports = handler;
