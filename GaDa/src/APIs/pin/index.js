import axios, { handleNetworkError } from '../index';

export const createPin = async pinData => {
  console.log(pinData);
  const res = await axios
    .post(`/pins`, { ...pinData })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const getWalkwayPinList = async walkwayId => {
  const res = await axios
    .get(`/pins/?walkwayId=${walkwayId}`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};
export const getUserPinList = async userId => {
  const res = await axios
    .get(`/pins/?userId=${userId}`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};
export const updatePin = async (id, pinData) => {
  const res = await axios
    .patch(`/pins/${id}`, { ...pinData })
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const deletePin = async id => {
  const res = await axios
    .delete(`/pins/${id}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};
