import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Ankit Kumar',
    role: 'Admin',
    isAuthenticated: true,
  });

  const login = (userData) => {
    setUser({ ...userData, isAuthenticated: true });
  };

  const logout = () => {
    setUser({ isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};