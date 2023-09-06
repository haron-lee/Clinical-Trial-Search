import Http from 'api/http';
import { Disease } from 'types';

const URL = 'http://localhost:4000/';

const searchHttp = new Http(URL);

export const getKeyword = async (keyword: string | undefined) => {
  return await searchHttp.get<Disease[]>('sick', {
    params: {
      q: keyword,
    },
  });
};
