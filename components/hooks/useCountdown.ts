import { useEffect, useState } from 'react';

const useCountdown = (
  initialSeconds: number,
  shouldStart: boolean,
  onCountdownEnd: () => void
) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (!shouldStart) {
      return;
    }

    if (seconds <= 0) {
      onCountdownEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          onCountdownEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [shouldStart, seconds, onCountdownEnd]);

  return seconds;
};

export default useCountdown;
