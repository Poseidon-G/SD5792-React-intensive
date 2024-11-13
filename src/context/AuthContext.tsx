import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Define the shape of the context value
interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoggedIn = token ? true : false;
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin) || false;

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};