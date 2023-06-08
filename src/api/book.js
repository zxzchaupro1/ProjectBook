import instance from './instance';

export const getAllBooks = () => {
  return instance.get('Book');
};

export const search = (name) => {
  return instance.post('Book', { name });
};
