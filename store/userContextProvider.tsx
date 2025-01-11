// UserContext.tsx

import React, { createContext, useState, ReactNode } from 'react';

// Define the types for the context
interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

// Create the provider component
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the context and provider
export { UserContext, UserProvider };
