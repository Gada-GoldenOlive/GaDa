import React from 'react';
import SettingPageScreen from '../screen/SettingPageScreen';
import { removeInLocalStorage } from '../../../function';
import RNRestart from 'react-native-restart';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../APIs/user';
import { setIsAuthenticated } from '../../../redux/modules/user';

const SettingPageContainer = ({ navigation }) => {
  const { userId, loginId, pw, nickname } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleNaigateNickname = () => {
    navigation.navigate('ModifyNickname');
  };
  const handleNavigatePW = () => {
    navigation.navigate('ModifyPW');
  };
  const handleLogout = async () => {
    await removeInLocalStorage();
    dispatch(setIsAuthenticated(false));
    RNRestart.Restart();
    return null;
  };
  const handleSignOut = async () => {
    await removeInLocalStorage();
    console.log(userId);
    await deleteUser(userId);
    dispatch(setIsAuthenticated(false));
    RNRestart.Restart();
    return null;
  };
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
