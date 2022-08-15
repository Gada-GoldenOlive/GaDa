import axios, { handleNetworkError } from '../index';

export const createUser = async userData => {
  const res = await axios
    .post(`/users`, { ...userData })
    .then(({ data }) => {
      return data;
    })
    .catch(err => console.log(err.response));
  return res;
};

export const getUserList = async () => {
  const res = await axios
    .get(`/users`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const updateUserInfo = async (id, userData) => {
  const res = await axios
    .patch(`/users/${id}`, { ...userData })
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const deleteUser = async id => {
  const res = await axios
    .delete(`/users/${id}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const getUsersCheckedId = async id => {
  const res = await axios
    .get(`/users/checked-id/?userId=${id}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const getUserLogin = async ({ id, pw }) => {
  console.log(id, pw)
  const res = await axios
    .get(`/users/login/?userId=${id}&password=${pw}`)
    .then(({ data }) => data)
    .catch(e => console.log(e));
  return res;
};
