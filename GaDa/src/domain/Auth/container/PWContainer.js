import { View, Text } from 'react-native';
import React from 'react';
import PWScreen from '../screen/PWScreen';

const PWContainer = ({ navigation }) => {
  const handleNavigate = () => {
    navigation.navigate('Nickname');
  };
  return <PWScreen handleNavigate={handleNavigate} />;
};

export default PWContainer;
