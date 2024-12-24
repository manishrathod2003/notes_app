import React from 'react';
import styles from './Dashboard.module.css';

const NotesList = ({ notes, onEdit, onDelete }) => {
  if (!Array.isArray(notes)) {
    return <p>No notes available.</p>; // Handle case when `notes` is not an array
  }

  return (
    <div className={styles.notesList}>
      {notes.length === 0 ? (
        <p>No notes available. Start by adding a new note!</p>
      ) : (
        notes.map((note) => (
          <div className={styles.noteCard} key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className={styles.actions}>
              <button onClick={() => onEdit(note)}>Edit</button>
              <button onClick={() => onDelete(note.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesList;
