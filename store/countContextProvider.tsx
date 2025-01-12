import Reason from '@/models/reasons';
import React, { createContext, useState, useContext } from 'react';

type reason = {
  reason : string;
  date   : string;
  time   : string;
}
interface CountContextType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  reasons: Reason[];
  setReasons: React.Dispatch<React.SetStateAction<Reason[]>>;
}

// Create the context
const CountContext = createContext<CountContextType | undefined>(undefined);

interface CountProviderProps {
  children: React.ReactNode;
}

// Provider Component
export const CountProvider: React.FC<CountProviderProps> = ({ children }) => {
  const [count, setCount] = useState<number>(0); // Default initial count state
  const [reasons, setReasons] = useState<Reason[]>([]); // Default initial reasons state

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
