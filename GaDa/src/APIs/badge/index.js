import axios, { handleNetworkError } from '../index';

export const getBadgeList = async userId => {
  const res = await axios
    .get(`/bedges/list`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};