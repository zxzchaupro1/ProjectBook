import instance from './instance';

export const getAllBooks = () => {
  return instance.get('Book');
};

export const getBookByCategory = (id) => {
  return instance.get(`book?categoryId=${id}`);
};

export const search = (name) => {
  return instance.post('Book', { name });
};
