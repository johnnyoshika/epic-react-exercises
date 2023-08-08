import { useState, useEffect } from 'react';

function useStickyState<T>(
  defaultValue: T,
  key: string,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null) setValue(JSON.parse(stickyValue));
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useStickyState;
