// src/components/CreateCollectionForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/createCollectionForm.css';

const CreateCollectionForm = () => {
  const [name, setName] = useState('');
  const [availableSets, setAvailableSets] = useState([]);
  const [selectedSets, setSelectedSets] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/flashcards/sets');
        setAvailableSets(response.data);
      } catch (error) {
        console.error('Failed to fetch flashcard sets:', error);
      }
    };

    fetchFlashcardSets();
  }, []);

  const handleCreateCollection = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/collections', {
        name,
        sets: selectedSets,
        comments: newComment ? [{ content: newComment }] : [],
      });

      // Reset form
      setName('');
      setSelectedSets([]);
      setNewComment('');
      alert('Collection created successfully');
    } catch (error) {
      console.error('Failed to create collection:', error);
    }
  };

  return (
    <div className="create-collection-container">
      <form className="create-collection-form" onSubmit={handleCreateCollection}>
        <div className="form-section">
          <label htmlFor="collection-name">Collection Name</label>
          <input
            type="text"
            id="collection-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter collection name"
            required
          />
        </div>

        <div className="form-section flashcard-set-selection">
          <label htmlFor="flashcard-sets">Select Flashcard Sets</label>
          <div className="flashcard-set-cards">
            {availableSets.map((set) => (
              <div
                key={set.id}
                className={`flashcard-set-card ${selectedSets.includes(set.id) ? 'selected' : ''}`}
                onClick={() => {
                  if (selectedSets.includes(set.id)) {
                    setSelectedSets(selectedSets.filter((s) => s !== set.id));
                  } else {
                    setSelectedSets([...selectedSets, set.id]);
                  }
                }}
              >
                <p>{set.name}</p>
              </div>
            ))}
          </div>
        </div>

       

        <div className="form-section">
          <button type="submit" className="create-collection-button">Create Collection</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCollectionForm;
