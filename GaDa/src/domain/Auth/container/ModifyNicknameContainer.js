import { View, Text } from 'react-native';
import React from 'react';
import ModifyNicknameScreen from '../screen/ModifyNicknameScreen';
import { useEffect } from 'react';
import { useState } from 'react';
import { getNicknameIsNotValid } from '../../../function';
import { updateUserInfo } from '../../../APIs/user';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from '../../../redux/modules/user';

const ModifyNicknameContainer = ({navigation, route}) => {
  const { nickname, userId } = useSelector(state => state.user);
  const [newNickname, setNewNickname] = useState(nickname);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  const nicknameChange = text => {
    setNewNickname(text);
  };
  const nicknameCheck = (text) => {
    const result = getNicknameIsNotValid(text);
    // 결과가 true면 중복이라는 소리임
    if (result) {
      setIsValid(false);
    } else {
      setIsValid(true);
      dispatch(setNickname(text))
    }
  };
  const handlePress = async () => {
    const data = {name: newNickname};
    console.log(data);
    await updateUserInfo(userId, data);
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTab' }],
    });
  };
  useEffect(() => {
    nicknameCheck(newNickname);
    console.log(newNickname, isValid);
  }, [newNickname]);
  return (
    <ModifyNicknameScreen
      nickname={newNickname}
      nicknameChange={nicknameChange}
      handlePress={handlePress}
      isValid={isValid}
    />
  );
};

export default ModifyNicknameContainer;
