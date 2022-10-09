import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import NicknameScreen from '../screen/NicknameScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setNickname } from '../../../redux/modules/user';
import {
  getNicknameIsNotValid,
  setIdInLocalStorage,
  storeInLocalStorage,
} from '../../../function';
import { createUser } from '../../../APIs/user';
import defaultAxios from '../../../APIs';
import { reloadApp } from '../../../function/error';
import { useState } from 'react';

const NicknameContainer = ({ navigation }) => {
  const { nickname, loginId, pw } = useSelector(state => state.user);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const handleNicknameChange = text => {
    dispatch(setNickname(text));
    const res = getNicknameIsNotValid(text);
    if (res) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const login = async () => {
   
      const userBody = {
        userId: loginId,
        password: pw,
        name: nickname,
        image: '',
      };
      delete defaultAxios.defaults.headers.common.Authorization;

      const res = await createUser(userBody);
      const { accessToken, refreshToken } = res;
      if (id !== null) {
        storeInLocalStorage(accessToken, refreshToken);
        dispatch(setIsAuthenticated(true));
        reloadApp();
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
      isValid={isValid}
      nickname={nickname}
      handleNavigate={login}
      handleNicknameChange={handleNicknameChange}
    />
  );
};

export default NicknameContainer;
