// src/components/CollectionsList.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCollections, deleteCollectionById } from '../services/api';
import '../styles/collectionsList.css';

const CollectionsList = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();
        setCollections(data);
      } catch (error) {
        console.error('Failed to fetch collections:', error);
      }
    };

    fetchCollections();
  }, []);

  const handleViewCollection = (collectionId) => {
    navigate(`/collections/${collectionId}`);
  };

  const handleDeleteCollection = async (collectionId) => {
    try {
      await deleteCollectionById(collectionId);
      setCollections(collections.filter((collection) => collection.id !== collectionId));
    } catch (error) {
      console.error('Failed to delete collection:', error);
    }
  };

  return (
    <div className="collections-list">
      <h2>Collections</h2>
      {collections.length === 0 ? (
        <p>No collections available.</p>
      ) : (
        <ul className="collections-grid">
          {collections.map((collection) => (
            <li key={collection.id} className="collection-card">
              <div className="collection-details">
                <h3>{collection.name}</h3>
                <p>{collection.description}</p>
              </div>
              <div className="collection-actions">
                <button 
                  onClick={() => handleViewCollection(collection.id)}
                  className="view-button"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteCollection(collection.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollectionsList;
