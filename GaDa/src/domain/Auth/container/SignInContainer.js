import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import SignInScreen from '../screen/SignInScreen';
import { set } from 'react-native-reanimated';
import { checkLogin, getUserLogin } from '../../../APIs/user';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated } from '../../../redux/modules/user';
import { setIdInLocalStorage } from '../../../function';

const SignInContainer = ({ navigation }) => {
  const [userId, setId] = useState('');
  const [pw, setPw] = useState('');

  const [isWrong, setIsWrong] = useState(false)
  const dispatch = useDispatch()
  const handleNavigateSignUp = () => {
    navigation.navigate('ID');
  };

  const handleNavigate = () => {
    console.log('hey');
    navigation.navigate('BottomTab');
  };
  const checkLogin = async () => {
  
    const res = await getUserLogin({ id: userId, pw: pw });
    const {id} = res;
    console.log(id)
    if(id !== null){
      setIdInLocalStorage(id)
      dispatch(setIsAuthenticated(true))
      handleNavigate()
    }
  };

  return (
    <SignInScreen
      id={id}
      pw={pw}
      setId={setId}
      setPw={setPw}
      handleNavigate={checkLogin}
      handleNavigateSignUp={handleNavigateSignUp}
    />
  );
};

export default SignInContainer;
