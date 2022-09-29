import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomImage from './CustomImage';
import Upload from '../constant/images/Upload';
import { windowHeight, windowWidth } from '../constant/styles';
import {
  borderColor,
  borderColorVer2,
  buttonColor,
  defaultColor,
  descriptionColorVer2,
  mainColor,
} from '../constant/colors';
import MyTextInput from './MyTextInput';
import CustomButton from './CustomButton';
import { boldFontFamily, mediumFontFamily } from '../constant/fonts';
import Text from './MyText';
import CameraSelectModal from './CameraSelectModal';
import { setPinImage } from '../redux/modules/images';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/core';
import Writing from '../constant/images/Writing';
import Locate from '../constant/images/Locate';
import { useDispatch } from 'react-redux';
import Camera from '../constant/images/Camera';
import CustomRating from './CustomRating';
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
  handlePress,
  type = 'pin',
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
      // console.log(images.assets[0]);
      //
      // console.log({ uri });
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
    console.log(items);
    dispatch(setPinImage(items));
  };

  return (
    <View style={styles.contianer}>
      <ScrollView style={styles.contianer} showsVerticalScrollIndicator={false}>
        <View>
          <TouchableWithoutFeedback onPress={openModal}>
            <View style={styles.imageContainer}>
              {/* <View style={styles.graient} /> */}
              <CustomImage source={{ uri: image }} style={styles.image} />
              {image === '' && (
                <CustomImage source={Upload} style={styles.upload} />
              )}
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.writingContainer}>
            <View style={styles.titleWrapper}>
              <MyTextInput
                placeholder={titlePlaceHolder}
                style={styles.title}
                onChangeText={titleTextChange}
                value={title}
              />
            </View>
            <CustomImage source={Writing} style={styles.writing} />
            <MyTextInput
              placeholder={contentPlaceholder}
              style={[
                styles.multiLine,
                type === 'walkway' && { borderBottomWidth: 0, multiLine: 114 },
              ]}
              multiline
              onChangeText={contentTextChange}
              value={content}
            />
            {type === 'walkway' && (
              <TouchableWithoutFeedback>
                <View style={styles.cameraWrapper}>
                  <CustomImage style={styles.camera} source={Camera} />
                </View>
              </TouchableWithoutFeedback>
            )}
            <View style={styles.bottomContainer}>
              {type === 'walkway' && (
                <View style={styles.informationContainer}>
                  <CustomRating
                    style={styles.rating}
                    readonly
                    size={40}
                    score={4}
                    starMargin={(windowWidth - 34 - 34 - 200) / 5}
                    tintColor={buttonColor}
                  />
                  <View style={styles.informationWrapper}>
                    <View style={[styles.information, {borderEndColor: descriptionColorVer2, borderEndWidth: 0.4}]}>
                      <Text style={styles.informationTitle}>거리</Text>
                      <Text style={styles.num}>11</Text>
                      <Text style={styles.informationDescription}>(m)</Text>
                    </View>
                    <View style={[styles.information, {borderStartColor: descriptionColorVer2, borderStartWidth:0.6 }]}>
                      <Text style={styles.informationTitle}>시간</Text>
                      <Text style={styles.num}>11</Text>
                      <Text style={styles.informationDescription}>(분)</Text>
                    </View>
                  </View>
                </View>
              )}
              <View style={styles.locateWrapper}>
                <CustomImage source={Locate} style={styles.locate} />
                <Text style={styles.location}>{address}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomButton title={buttonTitle} handlePress={handlePress} />
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
    marginTop: 9.5,
    paddingHorizontal: 16,
  },

  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  writing: {
    position: 'absolute',
    right: 16,
    top: 19.5,
    width: 24,
    height: 24,
  },
  title: {
    fontFamily: boldFontFamily,
  },
  multiLine: {
    minHeight: 200,
    //marginBottom: 56,
    color: defaultColor,
  },
  bottomContainer: {
    paddingTop: 21.5,
  },
  informationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: borderColorVer2,
    borderTopWidth: 1,
  },
  rating:{
    marginStart: 18,
    marginTop: 21.5,
  },
  informationWrapper:{
    flexDirection: 'row',
    backgroundColor: 'rgb(90,90,90)',
    paddingVertical: 8,
    flex: 1,
    marginVertical: 27,
  },
  information:{
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 38,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  informationTitle: {
    color: 'rgb(215,215,215)'
  },
  num:{
    fontFamily: boldFontFamily,
    fontSize: 22,
    color: 'white'
  },
  informationDescription:{
    color: 'white',
    fontSize: 10,
    fontFamily: mediumFontFamily
  },
  locateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 61.5
  },
  locate: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  upload: {
    position: 'absolute',
    width: 32,
    height: 37,
  },
  cameraWrapper: {
    width: 97,
    height: 97,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(196,196,196)',
    marginBottom: 13.5,
  },
  camera: {
    width: 34,
    height: 34,
  },
});
