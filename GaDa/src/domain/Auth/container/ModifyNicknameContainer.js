import React from 'react';
import ModifyNicknameScreen from '../screen/ModifyNicknameScreen';
import { useEffect } from 'react';
import { useState } from 'react';
import { getNicknameIsNotValid } from '../../../function';
import { checkNickname, updateUserInfo } from '../../../APIs/user';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from '../../../redux/modules/user';

const ModifyNicknameContainer = ({navigation, route}) => {
  const { nickname, userId, userImage } = useSelector(state => state.user);
  const [newNickname, setNewNickname] = useState(nickname);
  const [image, setImage] = useState(userImage);
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
      handleCheckDuplicate(text)
      setIsValid(true);
    }
  };

  const handleCheckDuplicate = async(text) => {
    const res = await checkNickname(text);
    if(res){
      const {isValid: valid} = res;
      setIsValid(valid);
    }

  }

  const handlePress = async () => {
    const data = {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlizf0lI5aTa4R2rTjku3h5VsosT8gDSzVYQ&usqp=CAU'};
    const res = await updateUserInfo(userId, data);
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTab' }],
    });
  };
  useEffect(() => {
    nicknameCheck(newNickname);
  }, [newNickname]);
  return (
    <ModifyNicknameScreen
      nickname={newNickname}
      nicknameChange={nicknameChange}
      handlePress={handlePress}
      isValid={isValid}
      image={image}
    />
  );
};

export default ModifyNicknameContainer;
