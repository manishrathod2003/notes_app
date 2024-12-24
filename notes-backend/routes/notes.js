// backend/routes/notes.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all notes
router.get('/get_notes', (req, res) => {
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error fetching notes' });
    }
    res.json({ success: true, notes: results });
  });
});

// Add a new note
router.post('/add_note', (req, res) => {
  const { title, content, user_id } = req.body; // Assume user_id is passed in request
  const query = 'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)';

  db.query(query, [user_id, title, content], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error adding note' });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Update an existing note
router.put('/update_note', (req, res) => {
  const { id, title, content } = req.body;
  const query = 'UPDATE notes SET title = ?, content = ? WHERE id = ?';

  db.query(query, [title, content, id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error updating note' });
    }
    res.json({ success: true, message: 'Note updated successfully' });
  });
});

// Delete a note
router.delete('/delete_note', (req, res) => {
  const { id } = req.body;
  const query = 'DELETE FROM notes WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error deleting note' });
    }
    res.json({ success: true, message: 'Note deleted successfully' });
  });
});

module.exports = router;
