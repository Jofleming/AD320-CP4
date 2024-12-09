import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../src/firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); 
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth); 
      setCurrentUser(null); // Clear the user state after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = { currentUser, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}