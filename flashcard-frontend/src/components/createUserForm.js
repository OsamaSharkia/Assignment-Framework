import React, { useState, useContext } from 'react';
import { createUser } from '../services/api';
import { UserContext } from '../context/userContext';
import '../styles/createUserForm.css'; // 

function CreateUserForm() {
  const [username, setUsername] = useState('');
  const { refreshUsers } = useContext(UserContext);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ username });
      alert('User created successfully');
      setUsername(''); // Clear the form after successful creation
      refreshUsers(); // Refresh user list
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Error creating user');
    }
  };

  return (
    <form className="create-user-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create User</h2>
      <div className="form-group">
        <label className="form-label">Username:</label>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <button className="form-submit-button" type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
