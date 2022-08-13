import { View, Text } from 'react-native';
import React from 'react';
import IDScreen from '../screen/IDScreen';
import { useState } from 'react';

const IDContainer = ({ navigation }) => {
  const [isWrong, setIsWrong] = useState(false);
  const handleNavigate = () => {
    navigation.navigate('PW');
  };
  return <IDScreen isWrong={isWrong} handleNavigate={handleNavigate} />;
};

export default IDContainer;
