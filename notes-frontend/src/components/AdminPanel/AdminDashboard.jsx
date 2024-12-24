import React from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = ({ users, notes, onDeleteUser, onDeleteNote }) => {
    return (
  <div className={styles.adminPanel}>
    <h2>User Management</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.username} <button onClick={() => onDeleteUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
    <h2>Notes Management</h2>
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          {note.title} <button onClick={() => onDeleteNote(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
  )
};

export default AdminDashboard;
