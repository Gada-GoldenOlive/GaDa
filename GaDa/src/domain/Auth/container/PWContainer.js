import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import PWScreen from '../screen/PWScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setPW } from '../../../redux/modules/user';

const PWContainer = ({ navigation }) => {
  const { pw, id } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handlePwChange = text => {
    dispatch(setPW(text));
  };

  const handleNavigate = () => {
    navigation.navigate('Nickname');
  };
  useEffect(() => {
    dispatch(setPW(''));
  }, []);
  return (
    <PWScreen
      pw={pw}
      handleNavigate={handleNavigate}
      handlePwChange={handlePwChange}
    />
  );
};

export default PWContainer;
