import instance from './instance';

export const getAllBooks = () => {
  return instance.get('book');
};

export const getBookByCategory = (id) => {
  return instance.get(`book?categoryId=${id}`);
};

export const search = (name) => {
  return instance.get(`book?q=${name}`);
};
