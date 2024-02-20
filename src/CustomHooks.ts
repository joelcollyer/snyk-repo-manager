import { useState, useEffect } from "react";

/**
 * Custom hook for getting and setting JSON objects in localStorage
 * @param key The name to use in localStorage
 * @param defaultValue A default/fallback value if JSON.parse throws or no value is found
 * @returns An array containing the parsed JSON and a setter function
 */
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T | null = null
): [T, React.Dispatch<T>] => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) return defaultValue;
      return JSON.parse(saved);
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    const rawValue = JSON.stringify(value);
    localStorage.setItem(key, rawValue);
  }, [key, value]);

  return [value, setValue];
};
