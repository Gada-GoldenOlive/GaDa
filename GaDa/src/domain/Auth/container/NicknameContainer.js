import { View, Text } from 'react-native';
import React from 'react';
import NicknameScreen from '../screen/NicknameScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setNickname } from '../../../redux/modules/user';
import { setIdInLocalStorage } from '../../../function';

const NicknameContainer = ({ navigation }) => {
  const { nickname, userId } = useSelector(state => state.status);
  const dispatch = useDispatch();
  const handleNicknameChange = text => {
    dispatch(setNickname(text));
  };

  const handleNavigate = () => {
    setIsAuthenticated(true);
    setIdInLocalStorage(userId);
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTab' }],
    });
  };
  return (
    <NicknameScreen
      nickname={nickname}
      handleNavigate={handleNavigate}
      handleNicknameChange={handleNicknameChange}
    />
  );
};

export default NicknameContainer;
