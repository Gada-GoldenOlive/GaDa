import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Text from './MyText';
import { mediumFontFamily } from '../constant/fonts';
import { blackColor, emphasisColorVer2 } from '../constant/colors';

import { useDispatch, useSelector } from 'react-redux';
import { setPinImage, setUploadImagesChanged } from '../redux/modules/images';
import { createNewMessage } from '../APIs/Chat';
import { getPreSignedUrl, uploadImage } from '../APIs/image';
import { useState } from 'react';
import { useEffect } from 'react';

const HeaderImageSubmitButton = props => {
  const { imageList, ver, body } = props;
  const [eachUrl, setEachUrl] = useState('');

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { bodyPhotoCount, bodyPhotoImages } = useSelector(({ images }) => ({
    bodyPhotoCount: images.bodyPhotoCount,
    bodyPhotoImages: images.bodyPhotoImages,
  }));
  const getURL = async () => {
    const res = await getPreSignedUrl();
    if(res){
      const {url} = res;
      setEachUrl(url);
    }
  }
  const handleClick = async () => {
    if (ver === 'pin') {
      // pin
      imageList.forEach(async item => {

        const uri = `data:${item.imageData.mime};base64,${item.imageData.data}`;
        await uploadImage(eachUrl, uri);
        
        const setImages = items => {
          dispatch(setPinImage(items));
          dispatch(setUploadImagesChanged(true));
        };
        
        setImages(eachUrl);
      });
      navigation.pop();
    }
  };

  useEffect(() => {
    getURL();
  }, [])
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
