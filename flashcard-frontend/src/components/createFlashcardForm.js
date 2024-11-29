// src/components/CreateFlashcardForm.js
import React, { useState } from 'react';
import { createFlashcard } from '../services/api';
import '../styles/createFlashcardForm.css'; // 

const CreateFlashcardForm = ({ setId, onFlashcardCreated }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const handleQuestionChange = (e) => setQuestion(e.target.value);
  const handleAnswerChange = (e) => setAnswer(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFlashcard = await createFlashcard(setId, { question, answer });
      onFlashcardCreated(newFlashcard);
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error('Failed to create flashcard:', error);
    }
  };

  return (
    <form className="create-flashcard-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create Flashcard</h2>
      <div className="form-group">
        <label className="form-label">Question:</label>
        <input
          className="form-input"
          type="text"
          value={question}
          onChange={handleQuestionChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Answer:</label>
        <input
          className="form-input"
          type="text"
          value={answer}
          onChange={handleAnswerChange}
          required
        />
      </div>
      <button className="form-submit-button" type="submit">Create Flashcard</button>
    </form>
  );
};


export default CreateFlashcardForm;
