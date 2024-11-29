// src/components/CreateFlashcardSetForm.js

import React, { useState } from 'react';
import { createFlashcardSet, createFlashcard } from '../services/api';
import '../styles/createFlashcardSetForm.css';

const CreateFlashcardSetForm = ({ onFlashcardSetCreated }) => {
  const [setName, setSetName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleSubmitSet = async (e) => {
    e.preventDefault();
    try {
      // Create the flashcard set first
      const newSet = await createFlashcardSet({ name: setName });

      // Call the callback function to let the parent component know a set has been created
      if (typeof onFlashcardSetCreated === 'function') {
        onFlashcardSetCreated(newSet);
      }

      // If there is a question, answer, and difficulty provided, create the first flashcard
      if (question && answer && difficulty) {
        await createFlashcard(newSet.id, {
          question,
          answer,
          difficulty,
        });
      }

      // Reset the form fields
      setSetName('');
      setQuestion('');
      setAnswer('');
      setDifficulty('');
    } catch (error) {
      console.error('Failed to create flashcard set:', error);
    }
  };

  return (
    <form onSubmit={handleSubmitSet} className="create-flashcard-set-form">
      <h2>Create Flashcard Set</h2>
      <label>
        Flashcard Set Name:
        <input
          type="text"
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
          required
        />
      </label>

      <h3>Add an Initial Flashcard (Optional)</h3>
      <label>
        Question:
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </label>
      <label>
        Answer:
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </label>
      <label>
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <button type="submit">Create Flashcard Set</button>
    </form>
  );
};

export default CreateFlashcardSetForm;
