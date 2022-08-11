import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Text from './MyText';
import { mediumFontFamily } from '../constant/fonts';
import { blackColor, emphasisColorVer2 } from '../constant/colors';

import { useDispatch, useSelector } from 'react-redux';
import { setPinImage, setUploadImagesChanged } from '../redux/modules/images';
import { createNewMessage } from '../APIs/Chat';

const HeaderImageSubmitButton = props => {
  const { imageList, ver, body } = props;
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { bodyPhotoCount, bodyPhotoImages } = useSelector(({ images }) => ({
    bodyPhotoCount: images.bodyPhotoCount,
    bodyPhotoImages: images.bodyPhotoImages,
  }));

  const handleClick = () => {
    if (ver === 'pin') {
      // pin
      imageList.forEach(async item => {
        const uri = `data:${item.imageData.mime};base64,${item.imageData.data}`;
        const setImages = items => {
          dispatch(setPinImage(items));
          dispatch(setUploadImagesChanged(true));
        };
        setImages(uri);
      });
      navigation.pop();
    }
  };
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
