import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { removeInLocalStorage, storeInLocalStorage } from '../function';
import { reloadApp } from '../function/error';
import { setIsAuthenticated, setUserId } from '../redux/modules/user';
import { refreshToken } from './JWT';
import defaultURL from './URL';

export const handleNetworkError = async error => {
  // request was made and the server responded with a status code
  if (error.response) {
    const { status } = error.response;
    // console.log(error.response);
    console.log('ERR', error.response.config.url);
    // 인증관련 에러
    console.log(status);
    if (status === 401 || status === 403) {
      const refresh_token = await AsyncStorage.getItem('refresh_token');
      console.log({refresh_token})
      if (refresh_token !== null) {
        defaultAxios.defaults.headers.common.Authorization = `Bearer ${refresh_token}`;

        const { new_access_token = '', new_refresh_token = '' } =
          await refreshToken();
        console.log({ new_access_token });
        if (new_access_token !== '' && new_refresh_token !== '') {
          defaultAxios.defaults.headers.common.Authorization = `Bearer ${new_access_token}`;
          await storeInLocalStorage(new_access_token, new_refresh_token);
        }
      }
    }
  } else {
    reloadApp();
  }
  return null;
};

const defaultAxios = axios.create({
  baseURL: defaultURL,
});
export const getNextData = async url => {
  const urlList = url.split(defaultURL);
  const res = await defaultAxios
    .get(defaultURL + urlList[1])
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

// 이게 필요할까?
export const checkServerHealthState = async () => {
  const res = defaultAxios
    .get('/nginx-health/')
    .then(() => true)
    .catch(() => false);
  return res;
};

export default defaultAxios;
