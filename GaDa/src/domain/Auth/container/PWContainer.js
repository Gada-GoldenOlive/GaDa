import { View, Text } from 'react-native';
import React from 'react';
import PWScreen from '../screen/PWScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setPW } from '../../../redux/modules/user';

const PWContainer = ({ navigation }) => {
  const { pw } = useSelector(state => state.status);
  const dispatch = useDispatch();
  const handlePwChange = text => {
    dispatch(setPW(text));
  };

  const handleNavigate = () => {
    navigation.navigate('Nickname');
  };
  return (
    <PWScreen
      pw={pw}
      handleNavigate={handleNavigate}
      handlePwChange={handlePwChange}
    />
  );
};

export default PWContainer;
