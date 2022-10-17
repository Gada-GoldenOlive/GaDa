import React from 'react';
import ModifyNicknameScreen from '../screen/ModifyNicknameScreen';
import { useEffect } from 'react';
import { useState } from 'react';
import { getNicknameIsNotValid } from '../../../function';
import { checkNickname, updateUserInfo } from '../../../APIs/user';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname, setUserImage } from '../../../redux/modules/user';
import { getParam } from '../../../function/image';
import { s3 } from '../../../constant/setting';
import { setImageFile } from '../../../redux/modules/images';

const ModifyNicknameContainer = ({ navigation, route }) => {
  const { nickname, userId, userImage } = useSelector(state => state.user);
  const { imageFile } = useSelector(state => state.images);
  const [newNickname, setNewNickname] = useState(nickname);
  const [image, setImage] = useState(userImage);
  const [isValid, setIsValid] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();

  const nicknameChange = text => {
    setNewNickname(text);
    nicknameCheck(text);
  };
  const nicknameCheck = text => {
    const result = getNicknameIsNotValid(text);
    // 결과가 true면 중복이라는 소리임
    if (result) {
      setIsValid(false);
    } else {
      handleCheckDuplicate(text)
      setIsValid(true);
      setIsChanged(true);
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
    if (imageFile !== null) {
      const param = await getParam(imageFile);
      s3.upload(param, async (err, data) => {
        if (err) {
          console.log('image upload err: ' + err);
          return;
        }
        const imgTag = `${data.Location}`;
        dispatch(setUserImage(imgTag));
        await updateUserInfo(userId, { image: imgTag });
      });
    }
    if (nickname !== newNickname) {
      dispatch(setNickname(newNickname));
      await updateUserInfo(userId, { name: newNickname });
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTab' }],
    });
  };

  useEffect(() => {
    if (image !== userImage) {
      setIsChanged(true);
    }
  }, [image]);

  useEffect(() => {
    dispatch(setImageFile(null));
  }, []);

  return (
    <ModifyNicknameScreen
      nickname={newNickname}
      nicknameChange={nicknameChange}
      handlePress={handlePress}
      setImage={setImage}
      isValid={isValid}
      isChanged={isChanged}
      image={image}
      navigation={navigation}
    />
  );
};

export default ModifyNicknameContainer;
