import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if the value or delay changes before the timeout completes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect if value or delay changes

  return debouncedValue;
}
