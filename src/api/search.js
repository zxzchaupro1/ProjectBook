import instance from './instance';

export const search = (name) => {
  return instance.post('Book', { name });
};
