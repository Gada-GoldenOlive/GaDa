import axios, { handleNetworkError } from '../index';

export const createWalk = async walkData => {
  const res = await axios
    .post(`/walkways/walk`, { ...walkData })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};
