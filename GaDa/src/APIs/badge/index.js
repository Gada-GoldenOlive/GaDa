import axios, { handleNetworkError } from '../index';

export const getBadgeList = async userId => {
  const res = await axios
    .get(`/badges/list`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};