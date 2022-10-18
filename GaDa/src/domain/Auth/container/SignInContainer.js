import { View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import SignInScreen from '../screen/SignInScreen';
import { set } from 'react-native-reanimated';
import { checkLogin, getUserLogin } from '../../../APIs/user';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setUserId } from '../../../redux/modules/user';
import jwtDecode from 'jwt-decode';
import defaultAxios from '../../../APIs';
import { storeInLocalStorage, storeIdInLocalStorage } from '../../../function';
const SignInContainer = ({ navigation }) => {
  const [userId, setId] = useState('');
  const [pw, setPw] = useState('');
  
  const [isWrong, setIsWrong] = useState(false);
  const [clickable, setClickable] = useState(false);
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
    console.log(res);
    if(res.statusCode){
      setIsWrong(true);
    }
    else{
      setIsWrong(false);
      const { accessToken, refreshToken } = res;
      console.log('signin', accessToken, refreshToken);
      if (accessToken !== null) {
        await saveTokenDataInLocalAndAxios(accessToken, refreshToken);

      } else {
        console.log(res);
      }

    }

  };

  const saveTokenDataInLocalAndAxios = async (accessToken, refreshToken) => {
    await storeInLocalStorage(accessToken, refreshToken);
    dispatch(setIsAuthenticated(true));
    const res = jwtDecode(accessToken);
    const {sub: userId} = res;
    console.log(userId)
    dispatch(setUserId(userId));
    defaultAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    handleNavigate();

  };

  useEffect(() => {
    if(userId.length > 6 && pw.length > 6){
      setClickable(true);
    } else {
      setClickable(false);
    }
  }, [userId, pw])

  return (
    <SignInScreen
      id={userId}
      pw={pw}
      clickable={clickable}
      setId={setId}
      setPw={setPw}
      isWrong={isWrong}
      handleNavigate={checkLogin}
      handleNavigateSignUp={handleNavigateSignUp}
    />
  );

};

export default SignInContainer;
