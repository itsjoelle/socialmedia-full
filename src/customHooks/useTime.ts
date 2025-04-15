import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const useTime = (timestamp: any) => {
  const getTime = (timestamp: any) => {
    if (!timestamp) return 'just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const [relativeTime, setRelativeTime] = useState(getTime(timestamp));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRelativeTime(
        formatDistanceToNow(new Date(timestamp), { addSuffix: true })
      );
    }, 60000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return relativeTime;
};

export default useTime;
