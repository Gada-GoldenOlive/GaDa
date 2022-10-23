import defaultAxios from '../index';
import axios from '../index';

// return is_valid
export const verifyToken = async token => {
  
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await axios
    .get('/users/check-token', { headers: { Authorization: `Bearer ${token}` } })
    .then(({ data }) => {
     return data;
    })
    .catch(e => {
      console.log(e.response.data);
      return {
        isValid: false,
      };
    });
  return res;
};

// new_access_token, new_refresh_token
export const refreshToken = async token => {
  console.log({token});
  
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const res = await axios
    .post('/users/refresh', { headers: { Authorization: `Bearer ${token}` } })
    .then(({ data }) => {
      const { accessToken = null, refreshToken = null } = data;
      return {
        new_access_token: accessToken,
        new_refresh_token: refreshToken,
      };
    })
    .catch(e => {
      console.log('refresh error', e.response.data);
      return {
        new_access_token: '',
        new_refresh_token: '',
      };
    });
  return res;
};
