import { View, Text } from 'react-native';
import React, { useState } from 'react';
import SignInScreen from '../screen/SignInScreen';
import { set } from 'react-native-reanimated';
import { checkLogin, getUserLogin } from '../../../APIs/user';
const SignInContainer = ({ navigation }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleNavigateSignUp = () => {
    navigation.navigate('ID');
  };

  const handleNavigate = () => {
    console.log('hey');
    navigation.navigate('BottomTab');
  };

  const checkLogin = async () => {
    const res = await getUserLogin({ id, pw });
    if (res) {
      console.log(res);
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
