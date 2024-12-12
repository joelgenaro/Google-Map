import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for debouncing any fast changing value.
 * The `func` parameter is the function that will be executed after the delay.
 * The `delay` parameter is the time in milliseconds to wait before executing the function.
 *
 * @param func The function to debounce.
 * @param delay The delay in milliseconds.
 * @returns A debounced version of the function.
 */
const useDebounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  return useCallback(
    (...args: Parameters<F>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => func(...args), delay);
    },
    [func, delay]
  );
};

export default useDebounce;
