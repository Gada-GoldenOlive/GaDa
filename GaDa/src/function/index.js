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
  const randomImage = `https://picsum.photos/${width}/${height}/?image=${num}`;
  return randomImage;
};


export const AddComma = num => {
  const regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ',');
};

export const getNicknameIsNotValid = (nickname = '') => {
  console.log(nickname)
  if(nickname.length > 17 || nickname.length < 2) {
    return true
  }
  const reg = /[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/ ]/gim;
  const result = reg.test(nickname);
  return result
}

export const getIDIsNotValid = (id) => {
  if(id.length > 20 || (id.length > 0 && id.length < 6)) {
    return true
  }
  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
 
  const result = korean.test(id);
  return result
}


export const getPWIsNotValid = (pw) => {
  if(pw.length > 20 || (pw.length > 0 && pw.length < 6)) {
    return true
  }
  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
 
  const result = korean.test(pw);
  return result
}

export const getDistance = ({distance = 0, unit = 'm' }) => {
  if(unit === 'm') {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return distance.toString().replace(regexp, ',')
  } else {
    const str = String( distance / 1000); 
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }
};

export const getHour = (time = 0) => {

  if(time === 0) {
    return '0분'
  }
  var h = Math.floor(time / 60);
  var m = Math.floor(time % 60 );

  var hDisplay = h > 0 ? h + "시간" : "";
  var mDisplay = m > 0 ? m + "분" : "";
  return hDisplay + mDisplay; 

}

export const getDistanceFromLatLonInKm = ({lat1,lng1,lat2,lng2}) =>  {
  const deg2rad = deg => {
      return deg * (Math.PI/180)
  }

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);  // deg2rad below
  const dLon = deg2rad(lng2-lng1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return d;
}


export const getDate = (time) => {
  console.log(time);

  return moment(time).format('YYYY.MM.DD')
}