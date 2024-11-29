// src/components/FlashcardSetsList.js

import React, { useEffect, useState, useContext } from 'react';
import { getFlashcardSets, deleteFlashcardSetById } from '../services/api'; 
import { useNavigate,Link } from 'react-router-dom';
import '../styles/flashcardSetsList.css';

function FlashcardSetsList() {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const sets = await getFlashcardSets();
        setFlashcardSets(sets);
      } catch (error) {
        console.error('Failed to fetch flashcard sets:', error);
      }
    };
    fetchSets();
  }, []);

  const handleDelete = async (setId) => {
    if (window.confirm('Are you sure you want to delete this flashcard set?')) {
      try {
        await deleteFlashcardSetById(setId);
        alert('Flashcard set deleted successfully');
        setFlashcardSets(flashcardSets.filter(set => set.id !== setId));
      } catch (error) {
        console.error('Failed to delete flashcard set:', error);
        alert('Error deleting flashcard set');
      }
    }
  };

  const handleEdit = (setId) => {
    navigate(`/flashcard-sets/${setId}/edit`); // Navigate to edit route
  };

  return (
    <div className="flashcard-sets-list">
      <h2 className="flashcard-sets-title">Flashcard Sets List</h2>
      {flashcardSets.map((set) => (
        <div key={set.id} className="flashcard-set-container">
          <h3 className="flashcard-set-title">
            <a href={`/flashcard-sets/${set.id}`}>{set.name}</a>
          </h3>
          <div className="button-container">
          <button className="edit-button">
          <Link to={`/flashcard-sets/${set.id}/edit`} className="update-link">
  <button className="update-button">Edit</button>
</Link>
</button>
            <button
              className="delete-button"
              onClick={() => handleDelete(set.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FlashcardSetsList;
