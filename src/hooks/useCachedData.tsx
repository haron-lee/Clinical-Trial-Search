import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

function useCachedData(key: string, fetcher: () => Promise<any>, delay = 1000) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!key) {
      setData(null);
      return;
    }

    const debouncedFetch = debounce(async () => {
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
    }, delay);

    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [key, fetcher, delay]);

  return data;
}

export default useCachedData;
