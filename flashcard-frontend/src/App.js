// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UsersList from './components/usersList';
import FlashcardSetsList from './components/flashcardSetsList';
import CreateUserForm from './components/createUserForm';
import ViewFlashcardSet from './components/viewFlashcardSet';
import CollectionsList from './components/collectionsList';
import CreateCollectionForm from './components/createCollectionForm';
import ViewCollection from './components/ViewCollection';
import UpdateFlashcardSetForm from './components/UpdateFlashcardSetForm';
import CreateFlashcardSetForm from './components/createFlashcardSetForm';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard'; // Import Dashboard Component
// Importing styles
import './App.css';
import './styles/usersList.css';
import './styles/flashcardSetsList.css';
import './styles/collectionsList.css';
import './styles/createCollectionForm.css';
import './styles/createFlashcardForm.css';
import './styles/createFlashcardSetForm.css';
import './styles/createUserForm.css';
import './styles/viewCollection.css';
import './styles/viewFlashcardSet.css';
import './styles/navbar.css';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <div className="App full-screen">
        <header className="app-header full-width">
          <nav className="app-nav"></nav>
        </header>
        <main className="app-main full-width">
          <Routes>
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <div className="users-page">
                    <CreateUserForm />
                    <UsersList />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/flashcard-sets"
              element={
                <PrivateRoute>
                  <div className="flashcard-sets-page">
                    <FlashcardSetsList />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/flashcard-sets/create"
              element={
                <PrivateRoute>
                  <CreateFlashcardSetForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/flashcard-sets/:setId"
              element={
                <PrivateRoute>
                  <ViewFlashcardSet />
                </PrivateRoute>
              }
            />
            <Route
              path="/flashcard-sets/:setId/edit"
              element={
                <PrivateRoute>
                  <UpdateFlashcardSetForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/collections"
              element={
                <PrivateRoute>
                  <div className="collections-page">
                    <CollectionsList />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/collections/create"
              element={
                <PrivateRoute>
                  <CreateCollectionForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/collections/:collectionId"
              element={
                <PrivateRoute>
                  <ViewCollection />
                </PrivateRoute>
              }
            />
            {/* Default route to redirect to dashboard if logged in or login page */}
            <Route path="*" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
