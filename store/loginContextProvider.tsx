import appwriteService from '@/utils/appwrite';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean | null; // Allow `null` to represent the loading state
  toggleLogin: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<boolean | null>(null); // `null` represents loading state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // `null` for loading

  const checkUser = async () => {
    try {
      const user = await appwriteService.isLoggedIn();
      setCurrentUser(user); // Update `currentUser` with the fetched data
    } catch (error) {
      console.error('Error fetching user:', error);
      setCurrentUser(null); // Handle error gracefully
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    // Update `isLoggedIn` whenever `currentUser` changes
    if (currentUser === null) {
      setIsLoggedIn(null); // Still loading
    } else {
      setIsLoggedIn(!!currentUser); // Convert truthy/falsy to boolean
    }
  }, [currentUser]);

  const toggleLogin = () => {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
