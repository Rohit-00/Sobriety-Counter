import React, { createContext, useState, useContext } from 'react';

type reasons = {
  reason : string;
  date   : Date;
  time   : string;
}
interface CountContextType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  reasons: string[];
  setReasons: React.Dispatch<React.SetStateAction<string[]>>;
}

// Create the context
const CountContext = createContext<CountContextType | undefined>(undefined);

interface CountProviderProps {
  children: React.ReactNode;
}

// Provider Component
export const CountProvider: React.FC<CountProviderProps> = ({ children }) => {
  const [count, setCount] = useState<number>(0); // Default initial count state
  const [reasons, setReasons] = useState<string[]>([]); // Default initial reasons state

  return (
    <CountContext.Provider value={{ count, setCount, reasons, setReasons }}>
      {children}
    </CountContext.Provider>
  );
};

// Custom Hook to use Count Context
export const useCount = (): CountContextType => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};
