import axios, { handleNetworkError } from '../index';

export const createUser = async userData => {
  console.log(userData);
  const res = await axios
    .post(`/users`, { ...userData })
    .then(({ data }) => {
      return data;
    })
    .catch(err => console.log('create', err.response));
  return res;
};

export const getUserList = async loginId => {
  const res = await axios
    .get(`/users?loginId=${loginId}`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const updateUserInfo = async (id, userData) => {
  console.log({id, userData})
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
    .catch(e => e.response.data);
  return res;
};

export const getUserDetail = async userId => {
  const res = await axios
    .get(`/users/${userId}/`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const getUserFriends = async () => {
  const res = await axios
    .get('/users/friends/')
    .then(({ data }) => data)
    .catch(e => console.log('err', e.response.data));
  return res;
};
export const checkNickname = async name => {
  const res = await axios
    .get(`users/checked-name?name=${name}`)
    .then(({ data }) => data)
    .catch(e => e.response.data);
  return res;
};

export const getAlarmList = async () => {
  const res = await axios
    .get('/users/friend-requests/')
    .then(({ data }) => data)
    .catch(e => e.response.data);

  return res;
};

export const addFriend = async id => {
  const res = await axios
    .post('/users/friends/', { friendLoginId: id })
    .then(({ data }) => data)
    .catch(e => console.log(e.response.data));
  return res;
};
export const modifyFriend = async (id, status) => {
  console.log(status);
  const res = await axios
    .patch(`/users/friends/${id}`, { status })
    .then(({ data }) => data)
    .catch(e => console.log(e.response.data));
  return res;
};
