import { View, Text } from 'react-native';
import React from 'react';
import SettingPageScreen from '../screen/SettingPageScreen';

const SettingPageContainer = ({ navigation }) => {
  const handleNaigateNickname = () => {
    navigation.navigate('ModifyNickname');
  };
  const handleNavigatePW = () => {
    navigation.navigate('ModifyPW');
  };
  return (
    <SettingPageScreen
      handleNaigateNickname={handleNaigateNickname}
      handleNavigatePW={handleNavigatePW}
    />
  );
};

export default SettingPageContainer;
