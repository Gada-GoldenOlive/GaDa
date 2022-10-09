import axios, { handleNetworkError } from '../index';

export const getBadgeList = async userId => {
  const res = await axios
    .get(`/bedges?userId=${userId}`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};