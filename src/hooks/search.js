import { useQuery } from 'react-query';
import { search } from '../api/search';

const searchbook = async (name) => {
  const res = await search(name);
  return res.data;
};

export function useSearchBook(name) {
  return useQuery(['search-book', name], () => searchbook(name));
}
