import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesList from '../components/Dashboard/NotesList';
import NoteForm from '../components/Dashboard/NoteForm';

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch notes when the component is mounted
  useEffect(() => {
    axios.get('http://localhost:5000/notes_api/get_notes')
      .then(response => {
        setNotes(response.data.notes || []);
      })
      .catch(error => {
        console.error('Error fetching notes:', error.response ? error.response.data : error.message);
      });
  }, []);

  const addOrUpdateNote = (note) => {
    const noteData = { title: note.title, content: note.content, user_id: 1 }; // Assuming user_id is 1

    if (note.id) {
      // Update existing note
      axios.put('http://localhost:5000/notes_api/update_note', noteData)
        .then(response => {
          setNotes(prevNotes => prevNotes.map(n => n.id === note.id ? { ...n, ...noteData } : n));
          setSelectedNote(null); // Reset the selected note after saving
        })
        .catch(error => {
          console.error('Error updating note:', error.response ? error.response.data : error.message);
        });
    } else {
      // Add new note
      axios.post('http://localhost:5000/notes_api/add_note', noteData)
        .then(response => {
          if (response.data.success) {
            const newNote = { ...noteData, id: response.data.id }; // Add id from the backend
            setNotes(prevNotes => [...prevNotes, newNote]);
          } else {
            console.error('Error adding note:', response.data.message);
          }
        })
        .catch(error => {
          console.error('Error adding note:', error.response ? error.response.data : error.message);
        });
    }
  };

  const deleteNote = (id) => {
    axios.delete('http://localhost:5000/notes_api/delete_note', { data: { id } })
      .then(response => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      })
      .catch(error => {
        console.error('Error deleting note:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div>
      <NoteForm onSave={addOrUpdateNote} initialData={selectedNote} />
      <NotesList notes={notes} onEdit={setSelectedNote} onDelete={deleteNote} />
    </div>
  );
};

export default DashboardPage;
