import { createContext, useContext, useMemo, useReducer } from 'react';
import { boothReducer, initialState } from './boothReducer.js';

const BoothContext = createContext(null);

export function BoothProvider({ children }) {
  const [state, dispatch] = useReducer(boothReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <BoothContext.Provider value={value}>{children}</BoothContext.Provider>;
}

export function useBooth() {
  const ctx = useContext(BoothContext);
  if (!ctx) throw new Error('useBooth must be used inside <BoothProvider>');
  return ctx;
}
