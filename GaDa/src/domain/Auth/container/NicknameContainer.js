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
import { checkNickname, createUser } from '../../../APIs/user';
import defaultAxios from '../../../APIs';
import { useState } from 'react';
import RNRestart from 'react-native-restart';

const NicknameContainer = ({ navigation }) => {
  
  const reloadApp = () => RNRestart.Restart();
  const { loginId, pw } = useSelector(state => state.user);
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [duplicated, setDuplicated] = useState(false);
  const [isOK, setIsOK] = useState('');
  const dispatch = useDispatch();

  const handleNicknameChange = text => {
    dispatch(setNickname(text));
    setName(text);
    const res = getNicknameIsNotValid(text);
    if (res) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    setIsOK(false);
    setDuplicated(false);
  };

  const handleCheckDuplicate = async() => {
    const res = await checkNickname(name);
    if(res){
      const {isValid} = res;
      setIsOK(isValid);
      setDuplicated(!isValid);
    }

  }
  const login = async () => {
   
      const userBody = {
        loginId: loginId,
        password: pw,
        name: name,
        image: '',
      };
      delete defaultAxios.defaults.headers.common.Authorization;

      const res = await createUser(userBody);
      const { accessToken, refreshToken } = res;
      if (loginId !== null) {
        storeInLocalStorage(accessToken, refreshToken);
        dispatch(setIsAuthenticated(true));
        reloadApp();
      }
    
  };
  useEffect(() => {
    dispatch(setNickname(''));
  }, []);
  return (
    <NicknameScreen
      isValid={isValid}
      isOK={isOK}
      name={name}
      duplicated={duplicated}
      handleNavigate={login}
      handleCheckDuplicate={handleCheckDuplicate}
      handleNicknameChange={handleNicknameChange}
    />
  );
};

export default NicknameContainer;
