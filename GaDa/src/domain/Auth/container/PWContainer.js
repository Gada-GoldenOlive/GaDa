import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import PWScreen from '../screen/PWScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setPW } from '../../../redux/modules/user';
import { getPWIsNotValid } from '../../../function';
import { useState } from 'react';

const PWContainer = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const handlePwChange = text => {
    setPassword(text);
    checkPW(text);
  };

  const handleNavigate = () => {
    dispatch(setPW(password));
    navigation.navigate('Nickname');
  };

  const checkPW = text => {
    console.log(text);
    const res = getPWIsNotValid(text);
    if (res) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };
  useEffect(() => {
    dispatch(setPW(''));
  }, []);
  return (
    <PWScreen
      isValid={isValid}
      password={password}
      handleNavigate={handleNavigate}
      handlePwChange={handlePwChange}
    />
  );
};

export default PWContainer;
