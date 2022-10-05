import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import NicknameScreen from '../screen/NicknameScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setNickname } from '../../../redux/modules/user';
import { setIdInLocalStorage, storeInLocalStorage } from '../../../function';
import { createUser } from '../../../APIs/user';

const NicknameContainer = ({ navigation }) => {
  const { nickname, userId, pw } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleNicknameChange = text => {
    dispatch(setNickname(text));
  };

  const login = async () => {
    if (nickname.length >= 1) {
      const userBody = {
        userId: userId,
        password: pw,
        name: nickname,
        image: '',
      };
      const res = await createUser(userBody);
      const {accessToken, refreshToken} = res;
      console.log(res);
      if (id !== null) {
        storeInLocalStorage(accessToken, refreshToken);
        dispatch(setIsAuthenticated(true));
        handleNavigate();
      }
    }
  };
  const handleNavigate = () => {
    dispatch(setIsAuthenticated(true));

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
      handleNavigate={login}
      handleNicknameChange={handleNicknameChange}
    />
  );
};

export default NicknameContainer;
