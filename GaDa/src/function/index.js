import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import store from '../redux/store';
import { reloadApp } from './error';

export const storeInLocalStorage = async (accessToken, refreshToken) => {
  await AsyncStorage.setItem('access_token', accessToken);
  await AsyncStorage.setItem('refresh_token', refreshToken);
};

export const removeInLocalStorage = () => {
  try {
    AsyncStorage.removeItem('access_token');
    AsyncStorage.removeItem('refresh_token');
  } catch (error) {
    reloadApp();
  }
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
  const randomImage =  `https://picsum.photos/${width}/${height}/?image=${num}`
  console.log(randomImage)
  return randomImage
}