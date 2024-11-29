// src/pages/FlashcardSetsPage.js
import React, { useEffect, useState } from 'react';
import { getFlashcardSets } from '../services/api';

const FlashcardSetsPage = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      try {
        const data = await getFlashcardSets();
        setFlashcardSets(data);
      } catch (err) {
        setError('Failed to fetch flashcard sets');
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcardSets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Flashcard Sets</h1>
      <ul>
        {flashcardSets.map((set) => (
          <li key={set.id}>{set.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FlashcardSetsPage;
