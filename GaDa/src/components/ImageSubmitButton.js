import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Text from './MyText';
import { mediumFontFamily } from '../constant/fonts';
import { blackColor, emphasisColorVer2 } from '../constant/colors';

import { useDispatch, useSelector } from 'react-redux';
import {
  setImageFile,
  setImageFileList,
  setPinImage,
  setProfileImage,
  setUploadImagesChanged,
  setWalkwayImages,
} from '../redux/modules/images';
import { useState } from 'react';
import { useEffect } from 'react';
import { getParam } from '../function/image';
import { s3 } from '../constant/setting';

const HeaderImageSubmitButton = props => {
  const { imageList, ver, body } = props;
  const [eachUrl, setEachUrl] = useState('');
  const {walkwayImages, imageFileList} = useSelector(state => state.images);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleClick = async () => {
    if (ver === 'pin') {
      imageList.forEach(async item => {
        dispatch(setImageFile(item.imageData));
      });
      navigation.pop();
    } else if (ver === 'profile') {
      imageList.forEach(async item => {
        dispatch(setImageFile(item.imageData));
      });
      navigation.pop();
    } else if (ver === 'review') {
      const list = [];
      const fileList = [];

      imageList.forEach(async image => {
        const uri = `data:${image.imageData.mime};base64,${image.imageData.data}`;
        list.push({url: uri})
        fileList.push(image.imageData);
      });
      
      dispatch(setWalkwayImages([...walkwayImages, ...list]));
      dispatch(setImageFileList([...imageFileList, ...fileList]));
      navigation.pop();
    }
  };

  useEffect(() => {
    //getURL();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.textButton} {...props}>
        <Text style={styles.text}>등록</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textButton: {
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: mediumFontFamily,
    color: blackColor,
  },
});

export default HeaderImageSubmitButton;
