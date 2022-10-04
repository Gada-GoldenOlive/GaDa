import { View, Text } from 'react-native';
import React from 'react';
import SettingPageScreen from '../screen/SettingPageScreen';
import { removeInLocalStorage } from '../../../function';
import RNRestart from 'react-native-restart';

const SettingPageContainer = ({ navigation }) => {
  const handleNaigateNickname = () => {
    navigation.navigate('ModifyNickname');
  };
  const handleNavigatePW = () => {
    navigation.navigate('ModifyPW');
  };
  const handleLogout = () => {
    removeInLocalStorage();
    RNRestart.Restart();
    return null;
  }
  return (
    <SettingPageScreen
      handleNaigateNickname={handleNaigateNickname}
      handleNavigatePW={handleNavigatePW}
      handleLogout={handleLogout}
    />
  );
};

export default SettingPageContainer;
