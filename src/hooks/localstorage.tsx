"use client";

import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Loads the value from localStorage or uses the initial value if nothing is stored.
    if (typeof window === "undefined") return initialValue;
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : initialValue;
  });
  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);

    // Saves the value to localStorage if the code is running in the browser.
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
