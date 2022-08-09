import axios, { handleNetworkError } from '../index';

export const createWalkway = async walkwayData => {
  const res = await axios
    .post(`/walkway`, { ...walkwayData })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const getWalkwayList = async ({ lng, lat }) => {
  const res = await axios
    .get(`/walkway/${lng}/${lat}`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const updateWalkway = async (id, walkwayData) => {
  const res = await axios
    .patch(`/walkway/${id}`, { ...walkwayData })
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const deleteWalkway = async id => {
  const res = await axios
    .delete(`/walkway/${id}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};
