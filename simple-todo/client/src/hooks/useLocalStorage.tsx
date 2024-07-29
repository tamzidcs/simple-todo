import { useState } from "react";

export function useLocalStorage(keyName: string, defaultValue: string) {
  const [storeValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });
  const setValue = (newValue: string) => {
    try {
      localStorage.setItem(keyName, newValue);
    } catch (error) {
        //ToDo
        //Handle error 
    }
    setStoredValue(newValue);
  };
  return [storeValue, setValue];
}
