// src/components/UpdateFlashcardSetForm.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFlashcardSetById, updateFlashcardSetById } from '../services/api';
import '../styles/updateFlashcardSetForm.css';

const UpdateFlashcardSetForm = ({ onFlashcardSetUpdated }) => {
  const { setId } = useParams();
  const [setName, setSetName] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSet = async () => {
      try {
        const flashcardSet = await getFlashcardSetById(setId);
        setSetName(flashcardSet.name);
        setCards(flashcardSet.cards || []);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch flashcard set');
        setLoading(false);
      }
    };
    fetchSet();
  }, [setId]);

  const handleCardChange = (index, key, value) => {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], [key]: value };
    setCards(updatedCards);
  };

  const handleAddCard = () => {
    setCards([...cards, { question: '', answer: '', difficulty: 'easy' }]);
  };

  const handleRemoveCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedSet = {
        name: setName,
        cards,
      };
      await updateFlashcardSetById(setId, updatedSet);
      if (typeof onFlashcardSetUpdated === 'function') {
        onFlashcardSetUpdated(updatedSet);
      }
      alert('Flashcard set updated successfully');
    } catch (error) {
      console.error('Failed to update flashcard set:', error);
      alert('Error updating flashcard set');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form className="update-flashcard-set-form" onSubmit={handleSubmit}>
      <h2>Update Flashcard Set</h2>
      <label>
        Flashcard Set Name:
        <input
          type="text"
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
          required
        />
      </label>

      <h3>Update Flashcards</h3>
      {cards.map((card, index) => (
        <div key={index} className="card-section">
          <label>
            Question:
            <input
              type="text"
              value={card.question}
              onChange={(e) => handleCardChange(index, 'question', e.target.value)}
              required
            />
          </label>
          <label>
            Answer:
            <input
              type="text"
              value={card.answer}
              onChange={(e) => handleCardChange(index, 'answer', e.target.value)}
              required
            />
          </label>
          <label>
            Difficulty:
            <select
              value={card.difficulty}
              onChange={(e) => handleCardChange(index, 'difficulty', e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <button type="button" onClick={() => handleRemoveCard(index)}>
            Remove Card
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddCard}>Add Card</button>

      <button type="submit">Update Flashcard Set</button>
    </form>
  );
};

export default UpdateFlashcardSetForm;
