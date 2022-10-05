import { View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import SignInScreen from '../screen/SignInScreen';
import { set } from 'react-native-reanimated';
import { checkLogin, getUserLogin } from '../../../APIs/user';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setUserId } from '../../../redux/modules/user';
import { setIdInLocalStorage, storeAccessToken, storeInLocalStorage } from '../../../function';
import jwtDecode from 'jwt-decode';
import defaultAxios from '../../../APIs';

const SignInContainer = ({ navigation }) => {
  const [userId, setId] = useState('');
  const [pw, setPw] = useState('');

  const [isWrong, setIsWrong] = useState(false);
  const dispatch = useDispatch();
  const handleNavigateSignUp = () => {
    navigation.navigate('ID');
  };

  const handleNavigate = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTab' }],
    });
    //navigation.navigate('BottomTabHome');
  };
  const checkLogin = async () => {
    const res = await getUserLogin({ id: userId, pw: pw });

    console.log({res});
    const { accessToken, refreshToken } = res;

    if (accessToken !== null) {
      saveTokenDataInLocalAndAxios(accessToken)
      handleNavigate();
    } else {
      console.log(res)
    }
  };

  const saveTokenDataInLocalAndAxios = async (accessToken) => {
    await storeAccessToken(accessToken);
    dispatch(setIsAuthenticated(true));
    const { user_id: userId } = jwtDecode(accessToken);
    dispatch(setUserId(userId));
    console.log(accessToken, userId)
    defaultAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  };


  return (
    <SignInScreen
      id={userId}
      pw={pw}
      setId={setId}
      setPw={setPw}
      handleNavigate={checkLogin}
      handleNavigateSignUp={handleNavigateSignUp}
    />
  );
};

export default SignInContainer;
