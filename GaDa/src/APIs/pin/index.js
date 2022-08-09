import axios, { handleNetworkError } from '../index';

export const createPin = async pinData => {
  const res = await axios
    .post(`/pin/`, { ...pinData })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const getPinList = async ({ walkwayId }) => {
  const res = await axios
    .get(`/pin/${walkwayId}/`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const updatePin = async (id, pinData) => {
  const res = await axios
    .patch(`/pin/${id}/`, { ...pinData })
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const deletePin = async id => {
  const res = await axios
    .delete(`/pin/${id}/`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};
