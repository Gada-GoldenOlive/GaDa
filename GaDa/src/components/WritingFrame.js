import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomImage from './CustomImage';
import Upload from '../constant/images/Upload';
import { windowHeight, windowWidth } from '../constant/styles';
import { defaultColor } from '../constant/colors';
import MyTextInput from './MyTextInput';
import CustomButton from './CustomButton';
import { boldFontFamily } from '../constant/fonts';
import Text from './MyText';
import CameraSelectModal from './CameraSelectModal';
import { setPinImage } from '../redux/modules/images';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/core';

const WritingFrame = ({
  title = '',
  content = '',
  address = '',
  titlePlaceHolder = '',
  contentPlaceholder = '',
  titleTextChange = {},
  contentTextChange = {},
  buttonTitle = '',
  image = '',
}) => {
  const navigation = useNavigation();

  const baseCameraOption = {
    mediaType: 'photo',
    includeBase64: true,
    cropping: true,
    cropperCancelText: '취소',
    cropperChooseText: '선택',
    freeStyleCropEnabled: true,
    loadingLabelText: '',
  };
  const baseImageLibraryOption = {
    mediaType: 'photo',
    includeBase64: true,
    // multiple: true,
    // maxFiles: 10,
    forceJpg: true,
    loadingLabelText: '',
  };

  const iosOptions = {
    height: 1000,
    width: 1000,
  };

  const [isVisible, setIsVisible] = useState(false);
  const openCamera = () => {
    ImageCropPicker.openCamera(
      Platform.OS === 'ios'
        ? { ...baseCameraOption, ...iosOptions }
        : baseCameraOption,
    ).then(images => {
      const uri = `data:${images.mime};base64,${images.data}`;
      setImages(uri);
      cancelModal();
    });
  };

  const openImageLibrary = () => {
    ImageCropPicker.openPicker(
      Platform.OS === 'ios'
        ? { ...baseImageLibraryOption, ...iosOptions }
        : baseImageLibraryOption,
    ).then(images => {
      let imageList = [];
      imageList.push({ imageData: images, image: images.path });

      navigation.navigate('DetailImage', {
        idx: 0,
        images: imageList,
        ver: 'pin',
        // handlePress: {
        //   setImage: setStylistImg,
        //   setImageChanged: setIsImgChanged,
        // },
      });
      cancelModal();
    });
  };

  const openModal = () => {
    setIsVisible(true);
  };
  const cancelModal = () => {
    setIsVisible(false);
  };

  const setImages = items => {
    dispatch(setPinImage(items));
  };

  return (
    <View style={styles.contianer}>
      <ScrollView style={styles.contianer}>
        <TouchableWithoutFeedback onPress={openModal}>
          <View style={styles.imageContainer}>
            {/* <View style={styles.graient} /> */}
            <CustomImage source={{ uri: image }} style={styles.image} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.writingContainer}>
          <MyTextInput placeholder={titlePlaceHolder} style={styles.title} />
          <MyTextInput
            placeholder={contentPlaceholder}
            style={styles.multiLine}
            multiline
          />
        </View>
      </ScrollView>
      <CustomButton title={buttonTitle} />
      <CameraSelectModal
        isVisible={isVisible}
        openCamera={openCamera}
        openImageLibrary={openImageLibrary}
        cancelModal={cancelModal}
      />
    </View>
  );
};

export default WritingFrame;

const styles = StyleSheet.create({
  contianer: { flex: 1, height: windowHeight },
  graient: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: windowWidth,
    height: 188,
    backgroundColor: defaultColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  writingContainer: {
    paddingtop: 9.5,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: boldFontFamily,
  },
  multiLine: {
    minHeight: 200,
    color: defaultColor,
  },
});
