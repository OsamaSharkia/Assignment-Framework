// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [remainingSets, setRemainingSets] = useState(20);

  useEffect(() => {
    // Fetch the number of flashcard sets left for the day
    const fetchSetsLimit = async () => {
      try {
        const response = await axios.get('http://localhost:3000/flashcard-sets/limit');
        setRemainingSets(response.data.remainingSets);
      } catch (error) {
        console.error('Error fetching flashcard sets limit:', error);
      }
    };

    fetchSetsLimit();
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome to Your Dashboard</h2>
      <p>You have <strong>{remainingSets}</strong> flashcard sets left to create today.</p>
    </div>
  );
};

export default Dashboard;
