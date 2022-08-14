import axios, { handleNetworkError } from '../index';

export const createWalk = async walkData => {
  const res = await axios
    .post(`/walks`, { ...walkData })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const getWalkList = async () => {
  const res = await axios
    .get(`/walks`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const updateWalk = async (id, walkData) => {
  const res = await axios
    .patch(`/walks/${id}`, { ...walkData })
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const deleteWalk = async id => {
  const res = await axios
    .delete(`/walks/${id}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};
