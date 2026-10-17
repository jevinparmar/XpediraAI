import { createContext, useContext } from 'react';

export const LenisContext = createContext(null);

export function useLenisInstance() {
  return useContext(LenisContext);
}
