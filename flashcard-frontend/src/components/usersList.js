// src/components/UsersList.js

import React, { useContext } from 'react';
import { deleteUserById } from '../services/api'; // Ensure to import the delete function correctly
import { UserContext } from '../context/userContext';
import '../styles/usersList.css';

function UsersList() {
  const { users, refreshUsers } = useContext(UserContext);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUserById(userId);
        alert('User deleted successfully');
        refreshUsers(); // Refresh user list after deleting
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Error deleting user');
      }
    }
  };

  return (
    <div className="users-list-container">
      <h2 className="users-title">Users List</h2>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <span className="user-name">{user.username}</span>
            <button
              className="delete-button"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
