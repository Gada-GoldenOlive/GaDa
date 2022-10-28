import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import store from '../redux/store';
import { reloadApp } from './error';

export const storeInLocalStorage = async (accessToken, refreshToken) => {
  await AsyncStorage.setItem('access_token', accessToken);
  await AsyncStorage.setItem('refresh_token', refreshToken);
};
export const storeAccessToken = async accessToken => {
  await AsyncStorage.setItem('access_token', accessToken);
};

export const removeInLocalStorage = async () => {
  try {
    AsyncStorage.removeItem('access_token');
    AsyncStorage.removeItem('refresh_token');
  } catch (error) {
    reloadApp();
  }
};
export const setIsFirstStart = async status => {
  await AsyncStorage.setItem('isFirstStart', status);
};

export const getIsFirstStart = async () => {
  const isFirstStart = await AsyncStorage.getItem('isFirstStart');
  return isFirstStart !== '1';
};


export const setIdInLocalStorage = async id => {
  await AsyncStorage.setItem('id', id);
};

export const setPwInLocalStorage = async pw => {
  await AsyncStorage.setItem('pw', pw);
};

export const setNicknameInLocalStorage = async nickname => {
  await AsyncStorage.setItem('nickname', nickname);
};

export const getIdInLocalStorage = async () => {
  const res = await AsyncStorage.getItem('id');
  return res;
};

export const getCurrentTime = () => {
  const current = moment().startOf('second');
  return current;
};

export const getDuringTime = () => {
  const { startTime, endTime } = store.getState().status;
  const start = moment(startTime, 'YYYY-MM-DD[T]HH:mm:ss');
  const end = moment(endTime, 'YYYY-MM-DD[T]HH:mm:ss');

  const dueSeconds = Math.floor(moment.duration(end.diff(start)).asSeconds());

  return dueSeconds;
};

export const getRandomImage = (width = 150, height = 150) => {
  const num = Math.floor(Math.random() * 1000);
  const randomImage = `https://picsum.photos/${width}/${height}/?image=${num}`;
  return randomImage;
};

export const AddComma = num => {
  const regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ',');
};

export const getNicknameIsNotValid = (nickname = '') => {
  console.log(nickname);
  if (nickname.length > 17 || nickname.length < 2) {
    return true;
  }
  const reg = /[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/ ]/gim;
  const result = reg.test(nickname);
  return result;
};

export const getIDIsNotValid = id => {
  if (id.length > 20 || (id.length >= 0 && id.length < 6)) {
    return true;
  }
  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const result = korean.test(id);
  return result;
};

export const getPWIsNotValid = pw => {
  if (pw.length > 20 || (pw.length >= 0 && pw.length < 6)) {
    return true;
  }
  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const result = korean.test(pw);
  return result;
};

export const getDistance = ({ distance = 0, unit = 'm' }) => {
  const fixed = distance > 0 ? distance.toFixed(0) : distance;
  if (unit === 'm') {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return fixed.toString().replace(regexp, ',');
  } else {
    const str = String(distance > 0 ? (distance / 1000).toFixed(2) : 0);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }
};
export const getHourWithMin = (time = 0) => {
  if (time === 0) {
    return '0분';
  }
  const h = Math.floor(time / 60);
  const m = Math.floor(time % 60);

  var hDisplay = h > 0 ? h + '시간' : '';
  var mDisplay = m > 0 ? m + '분' : '';
  return hDisplay + mDisplay;
};
export const getHour = (time = 0) => {
  if (time === 0) {
    return '0초';
  }
  const h = Math.floor(time / 3600);
  const m = Math.floor((time - h * 3600) / 60);
  const s = Math.floor(time - h * 3600 - m * 60);

  var hDisplay = h > 0 ? h + '시간' : '';
  var mDisplay = m > 0 ? m + '분' : '';
  var sDisplay = s > 0 ? s + '초' : '';
  return hDisplay + mDisplay + sDisplay;
};
export const getGoalHour = (time = 0) => {
  if (time === 0) {
    return [0, 0, 0];
  }
  const h = Math.floor(time / 3600);
  const m = Math.floor((time - h * 3600) / 60);
  const s = Math.floor(time - h * 3600 - m * 60);

  var hDisplay = h > 0 ? h : '';
  var mDisplay = m > 0 ? m : '';
  var sDisplay = s > 0 ? s : '';
  return [hDisplay, mDisplay, sDisplay];
};

export const getDistanceFromLatLonInKm = ({ lat1, lng1, lat2, lng2 }) => {
  // console.log({ lat1, lng1, lat2, lng2 });
  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

export const getDate = time => {
  return moment(time).format('YYYY.MM.DD');
};

export const getTimeFromSec = time => {
  console.log(time);
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time - hour * 3600) / 60);
  const sec = Math.floor(time - hour * 3600 - min * 60);

  const hourString = hour > 0 ? `${hour}시: ` : '';
  const minString = min > 0 ? `${min}분:` : '';
  const secString = sec > 0 ? `${sec}초` : `0초`;
  const timeString = hourString + minString + secString;
  if (hour > 0) {
    return `${hour}:${min}:${sec}`;
  } else {
    return timeString;
  }
};
