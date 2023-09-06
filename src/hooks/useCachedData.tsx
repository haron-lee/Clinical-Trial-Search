import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

function useCachedData(key: string, fetcher: () => Promise<any>, delay = 1000) {
  const [data, setData] = useState(null);

  const debouncedFetch = useCallback(
    debounce(async (key) => {
      let result;

      const cachedItem = sessionStorage.getItem(key);

      if (cachedItem && Date.now() - JSON.parse(cachedItem).timestamp <= 300000) {
        result = JSON.parse(cachedItem).data;
        console.info('calling caching data');
      } else {
        result = await fetcher();
        console.info('calling api');

        if (result !== undefined) {
          sessionStorage.setItem(
            key,
            JSON.stringify({
              data: result,
              timestamp: Date.now(),
            }),
          );
        }
      }

      setData(result);
    }, delay),
    [fetcher],
  );

  useEffect(() => {
    if (!key) {
      setData(null);
      return;
    }

    debouncedFetch(key);

    return () => debouncedFetch.cancel();
  }, [key, debouncedFetch]);

  return data;
}

export default useCachedData;
