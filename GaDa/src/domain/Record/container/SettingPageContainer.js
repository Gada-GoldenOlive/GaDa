import React from 'react';
import SettingPageScreen from '../screen/SettingPageScreen';
import { removeInLocalStorage, setIsFirstStart } from '../../../function';
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

  const handleNaivgateGuide = () => {
    navigation.navigate('UserGuide');
  }
  const handleLogout = async () => {
    await removeInLocalStorage();
    dispatch(setIsAuthenticated(false));
    RNRestart.Restart();
    return null;
  };
  const handleSignOut = async () => {
    await removeInLocalStorage();
    await deleteUser(userId);
    dispatch(setIsAuthenticated(false));
    await setIsFirstStart('0');
    RNRestart.Restart();
    return null;
  };
  return (
    <SettingPageScreen
      handleNaigateNickname={handleNaigateNickname}
      handleNavigatePW={handleNavigatePW}
      handleLogout={handleLogout}
      handleSignOut={handleSignOut}
      handleNaivgateGuide={handleNaivgateGuide}
    />
  );
};

export default SettingPageContainer;
