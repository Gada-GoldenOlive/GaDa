import { View, Text } from 'react-native';
import React from 'react';
import ModifyNicknameScreen from '../screen/ModifyNicknameScreen';
import { useEffect } from 'react';
import { useState } from 'react';
import { getNicknameIsNotValid } from '../../../function';

const ModifyNicknameContainer = ({}) => {
  const [nickname, setNickname] = useState('');

  const [isValid, setIsValid] = useState(true);
  const nicknameChange = text => {
    setNickname(text);
  };
  const nicknameCheck = () => {
    const result = getNicknameIsNotValid({nickname});
    // 결과가 true면 중복이라는 소리임
   if(result){
    setIsValid(false)
   } else{
    setIsValid(true)
   }
  };

  useEffect(() => {
    nicknameCheck(nickname)
    console.log(nickname, isValid)
  }, [nickname])
  return (
    <ModifyNicknameScreen
      nickname={nickname}
      nicknameChange={nicknameChange}
      nicknameCheck={nicknameCheck}
      isValid={isValid}
    />
  );
};

export default ModifyNicknameContainer;
