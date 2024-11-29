// src/components/ViewFlashcardSet.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFlashcardSetById } from '../services/api';
import '../styles/viewFlashcardSet.css';

const ViewFlashcardSet = () => {
  const { setId } = useParams(); 
  const [flashcardSet, setFlashcardSet] = useState(null);

  useEffect(() => {
    const fetchFlashcardSet = async () => {
      try {
        const data = await getFlashcardSetById(setId);
        setFlashcardSet(data);
      } catch (error) {
        console.error('Failed to fetch flashcard set:', error);
      }
    };

    if (setId) {
      fetchFlashcardSet();
    }
  }, [setId]);

  if (!flashcardSet) {
    return <p>Loading flashcard set...</p>;
  }

  return (
    <div className="view-flashcard-set">
      <h2>{flashcardSet.name}</h2>
      {flashcardSet.cards.length === 0 ? (
        <p>No questions available in this flashcard set.</p>
      ) : (
        <ul className="flashcard-list">
          {flashcardSet.cards.map((card) => (
            <li key={card.id} className="flashcard-item">
              <div className="flashcard-circle">
                <div className="flashcard-content">
                  <div className="flashcard-question">
                    <strong>Question:</strong> {card.question}
                  </div>
                  <div className="flashcard-difficulty">
                    <strong>Difficulty:</strong> {card.difficulty}
                  </div>
                  <div className="flashcard-answer">
                    <span className="reveal-answer">
                      Hover to Reveal Answer
                    </span>
                    <div className="answer-text">{card.answer}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewFlashcardSet;
