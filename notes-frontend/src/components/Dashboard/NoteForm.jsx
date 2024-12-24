import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

const NoteForm = ({ onSave, initialData }) => {
  const [note, setNote] = useState({ title: '', content: '' });

  useEffect(() => {
    if (initialData) {
      setNote({ title: initialData.title, content: initialData.content });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.content) {
      alert('Title and content are required');
      return;
    }
    onSave(note);
    setNote({ title: '', content: '' });
  };

  return (
    <form className={styles.noteForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      />
      <button type="submit">{initialData ? 'Update' : 'Save'}</button>
    </form>
  );
};

export default NoteForm;
