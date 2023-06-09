import instance from './instance';

export const getAllCategory = () => {
  return instance.get('/category');
};
