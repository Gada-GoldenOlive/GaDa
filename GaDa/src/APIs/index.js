import axios from 'axios';
import { reloadApp } from '../function/error';
import defaultURL from './URL';

export const handleNetworkError = error => {
  // request was made and the server responded with a status code
  if (error.response) {
    const { status } = error.response;
    // console.log(error.response);
    console.log(error.response.data);
    // 인증관련 에러
    // if (status === 401 || status === 403) {
    //   delete axios.defaults.headers.common.Authorization;
    //   delete chatAxios.defaults.headers.common.Authorization;
    //   removeInLocalStorage();
    //   changeIsStylist('0');
    //   reloadApp();
    // } else {
    //   reloadApp();
    // }
  } else {
    reloadApp();
  }
  return null;
};

const defaultAxios = axios.create({
  baseURL: defaultURL,
});

// 이게 필요할까?
export const checkServerHealthState = async () => {
  const res = defaultAxios
    .get('/nginx-health/')
    .then(() => true)
    .catch(() => false);
  return res;
};

export default defaultAxios;
