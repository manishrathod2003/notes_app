const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Body parser middleware to handle JSON data
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notes_app'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  } else {
    console.log('Database connected');
  }
});

// Get notes API
app.get('/notes_api/get_notes', (req, res) => {
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) {
      console.error('Error fetching notes:', err);
      return res.status(500).json({ success: false, message: 'Error fetching notes' });
    }
    res.json({ success: true, notes: results });
  });
});

// Add note API
app.post('/notes_api/add_note', (req, res) => {
  const { title, content, user_id } = req.body;

  if (!title || !content || !user_id) {
    console.error('Missing required fields:', req.body);
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const query = 'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)';
  db.query(query, [user_id, title, content], (err, result) => {
    if (err) {
      console.error('Error adding note:', err);
      return res.status(500).json({ success: false, message: 'Error adding note' });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Update note API
app.put('/notes_api/update_note', (req, res) => {
  const { id, title, content, user_id } = req.body;

  if (!id || !title || !content || !user_id) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const query = 'UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?';
  db.query(query, [title, content, id, user_id], (err, result) => {
    if (err) {
      console.error('Error updating note:', err);
      return res.status(500).json({ success: false, message: 'Error updating note' });
    }
    res.json({ success: true });
  });
});

// Delete note API
app.delete('/notes_api/delete_note', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: 'Missing note ID' });
  }

  const query = 'DELETE FROM notes WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting note:', err);
      return res.status(500).json({ success: false, message: 'Error deleting note' });
    }
    res.json({ success: true });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
