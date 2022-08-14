import { View, Text } from 'react-native';
import React, { useState } from 'react';
import SignInScreen from '../screen/SignInScreen';
import { set } from 'react-native-reanimated';

const SignInContainer = ({ navigation }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleNavigateSignUp = () => {
    navigation.navigate('ID');
  };
  return (
    <SignInScreen
      id={id}
      pw={pw}
      setId={setId}
      setPw={setPw}
      handleNavigateSignUp={handleNavigateSignUp}
    />
  );
};

export default SignInContainer;
