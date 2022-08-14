import AsyncStorage from '@react-native-async-storage/async-storage';
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
