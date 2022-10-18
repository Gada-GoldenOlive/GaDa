import defaultAxios from '../index';
import axios from '../index';

// return is_valid
export const verifyToken = async token => {
  const res = await axios
    .post('/auth/token/verify/', {
      token,
    })
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return {
        is_valid: false,
      };
    });
  return res;
};

// new_access_token, new_refresh_token
export const refreshToken = async () => {
  const res = await axios
    .post('/users/refresh/')
    .then(({ data }) => {
      const { accessToken = null, refreshToken = null } = data;
      return {
        new_access_token: accessToken,
        new_refresh_token: refreshToken,
      };
    })
    .catch(e => {
      console.log('refresh error', e)
      return {
        new_access_token: '',
        new_refresh_token: '',
      };
    });
  return res;
};
