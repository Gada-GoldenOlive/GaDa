import axios, { handleNetworkError } from '../index';

export const createUser = async userData => {
  const res = await axios
    .post(`/user/`, { ...userData })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const getUserList = async () => {
  const res = await axios
    .get(`/user/`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const updateUserInfo = async (id, userData) => {
  const res = await axios
    .patch(`/user/${id}/`, { ...userData })
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const deleteUser = async id => {
  const res = await axios
    .delete(`/user/${id}/`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};
