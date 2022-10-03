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
export const refreshToken = async token => {
  const res = await axios
    .post('/auth/token/refresh/', {
      refresh: token,
    })
    .then(({ data }) => {
      const { access = null, refresh = null } = data;
      return {
        new_access_token: access,
        new_refresh_token: refresh,
      };
    })
    .catch(() => {
      return {
        new_access_token: '',
        new_refresh_token: '',
      };
    });
  return res;
};