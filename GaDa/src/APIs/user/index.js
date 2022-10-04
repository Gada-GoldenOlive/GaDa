import axios, { handleNetworkError } from '../index';

export const createUser = async userData => {
  console.log(userData);
  const res = await axios
    .post(`/users`, { ...userData })
    .then(({ data }) => {
      return data;
    })
    .catch(err => err.response.data.statusCode);
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
    .get(`/users/checked-id?loginId=${id}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const getUserLogin = async ({ id, pw }) => {
  console.log(id, pw);
  const res = await axios
    .post(`/users/login/`, { loginId: id, password: pw })
    .then(({ data }) => data)
    .catch(e => console.log(e.response.data));
  return res;
};

export const getUserDetail = async () => {
  const res = await axios
    .get('/users/detail')
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};
