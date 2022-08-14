import { View, Text } from 'react-native';
import React from 'react';
import NicknameScreen from '../screen/NicknameScreen';

const NicknameContainer = ({ navigation }) => {
  const handleNavigate = () => {
    navigation.navigate('BottomTabHome');
  };
  return <NicknameScreen handleNavigate={handleNavigate} />;
};

export default NicknameContainer;
