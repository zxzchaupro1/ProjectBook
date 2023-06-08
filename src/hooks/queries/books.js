import { useQuery } from 'react-query';
import { getAllBooks } from '../../api/book';

const getbooks = async () => {
  const res = await getAllBooks();
  return res.data;
};

export function useQueryBooks() {
  return useQuery(['books'], () => getbooks());
}
