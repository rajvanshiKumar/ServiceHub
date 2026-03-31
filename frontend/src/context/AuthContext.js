import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user,  setUser]  = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved && token) setUser(JSON.parse(saved));
  }, [token]);

  const login = (userData, tokens) => {
    localStorage.setItem('access_token',  tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(tokens.access);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);