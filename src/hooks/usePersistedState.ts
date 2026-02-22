import { useState, useCallback } from 'react';

export function usePersistedState<T>(key: string, initialValue: T | (() => T)): [T, (val: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        // Special handle literal 'true' and 'false' for booleans since we previously stored 'true'/'false' as raw strings
        if (item === 'true') return true as unknown as T;
        if (item === 'false') return false as unknown as T;
        return item as unknown as T;
      }
    } catch { /* ignore */ }
    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  const setPersistedState = useCallback((value: T | ((prev: T) => T)) => {
    setState((prevState) => {
      const nextValue = value instanceof Function ? value(prevState) : value;
      try {
        window.localStorage.setItem(key, String(nextValue));
      } catch { /* ignore */ }
      return nextValue;
    });
  }, [key]);

  return [state, setPersistedState];
}
