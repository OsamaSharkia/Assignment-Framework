import React, { createContext, useState, useEffect } from 'react';
import { getUsers } from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
  
    const refreshUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
  
    useEffect(() => {
      refreshUsers();
    }, []);
  
    return (
      <UserContext.Provider value={{ users, refreshUsers }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  
