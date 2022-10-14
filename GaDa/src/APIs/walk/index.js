import axios, { handleNetworkError } from '../index';

export const createWalk = async walkData => {
  const res = await axios
    .post(`/walkways/walks`, { ...walkData })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const getDetailWalk = async walkId => {
  const res = await axios
    .get(`/walkways/walks/${walkId}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};
