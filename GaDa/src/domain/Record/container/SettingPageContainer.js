import { View, Text } from 'react-native';
import React from 'react';
import SettingPageScreen from '../screen/SettingPageScreen';
import { removeInLocalStorage } from '../../../function';
import RNRestart from 'react-native-restart';
import { useSelector } from 'react-redux';
import { deleteUser } from '../../../APIs/user';

const SettingPageContainer = ({ navigation }) => {
  const { userId, loginId, pw, nickname} = useSelector(state => state.user);
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
  const handleSignOut = async () => {
    removeInLocalStorage();
    console.log(userId)
    await deleteUser(userId);
    RNRestart.Restart();
    return null;
;

  }
  return (
    <SettingPageScreen
      handleNaigateNickname={handleNaigateNickname}
      handleNavigatePW={handleNavigatePW}
      handleLogout={handleLogout}
      handleSignOut={handleSignOut}
    />
  );
};

export default SettingPageContainer;
