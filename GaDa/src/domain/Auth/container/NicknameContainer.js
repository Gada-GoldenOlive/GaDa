import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import NicknameScreen from '../screen/NicknameScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setNickname } from '../../../redux/modules/user';
import { setIdInLocalStorage } from '../../../function';

const NicknameContainer = ({ navigation }) => {
  const { nickname, userId, pw } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleNicknameChange = text => {
    dispatch(setNickname(text));
  };
  console.log(nickname, userId, pw);
  const handleNavigate = () => {
    dispatch(setIsAuthenticated(true));
    setIdInLocalStorage(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTab' }],
    });
  };
  useEffect(() => {
    dispatch(setNickname(''));
  }, []);
  return (
    <NicknameScreen
      nickname={nickname}
      handleNavigate={handleNavigate}
      handleNicknameChange={handleNicknameChange}
    />
  );
};

export default NicknameContainer;
