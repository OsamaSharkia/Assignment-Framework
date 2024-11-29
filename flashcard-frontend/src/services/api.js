// src/api.js

import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const getFlashcardSets = async () => {
    try {
      const response = await fetch('http://localhost:3000/flashcards/sets');
      if (!response.ok) {
        throw new Error('Failed to fetch flashcard sets');
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  export const createUser = async (user) => {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();


  };
  export const deleteUserById = async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  };
export const createFlashcard = async (setId, data) => {
    const response = await axios.post(`${API_URL}/flashcards/sets/${setId}/cards`, data);
    return response.data;
  };
  export const createFlashcardSet = async (data) => {
    const response = await axios.post(`${API_URL}/flashcards/sets`, data);
    return response.data;
  };
  
  
  // Function to get a specific flashcard set by ID
  export const getFlashcardSetById = async (setId) => {
    const response = await axios.get(`${API_URL}/flashcards/sets/${setId}`);
    return response.data;
  };
  
  // Function to update a flashcard set by ID
  export const updateFlashcardSetById = async (setId, data) => {
    const response = await axios.put(`${API_URL}/flashcards/sets/${setId}`, data);
    return response.data;
  };
  
  // Function to delete a flashcard set by ID
  export const deleteFlashcardSetById = async (setId) => {
    const response = await axios.delete(`${API_URL}/flashcards/sets/${setId}`);
    return response.data;
  };

  // Function to get all collections
export const getCollections = async () => {
    const response = await axios.get(`${API_URL}/collections`);
    return response.data;
  };
  
  // Function to create a new collection
  export const createCollection = async (data) => {
    const response = await axios.post(`${API_URL}/collections`, data);
    return response.data;
  };
  
  // Function to get a collection by ID
  export const getCollectionById = async (collectionId) => {
    const response = await axios.get(`${API_URL}/collections/${collectionId}`);
    return response.data;
  };
  
  // Function to delete a collection by ID
  export const deleteCollectionById = async (collectionId) => {
    const response = await axios.delete(`${API_URL}/collections/${collectionId}`);
    return response.data;
  };
