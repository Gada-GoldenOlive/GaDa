import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  setIsThumbnail,
  setThumbnailFile,
  setThumbnailImage,
} from '../../../redux/modules/images';
import Upload from '../../../constant/images/Upload';
import { getDistance, getGoalHour, getTimeFromSec } from '../../../function';
import {
  boldFontFamily,
  defaultFontFamily,
  mediumFontFamily,
} from '../../../constant/fonts';
import {
  borderColorVer2,
  defaultColor,
  descriptionColorVer2,
  mainColor,
} from '../../../constant/colors';
import { windowHeight, windowWidth } from '../../../constant/styles';
import CustomImage from '../../../components/CustomImage';
import Writing from '../../../constant/images/Writing';
import MyTextInput from '../../../components/MyTextInput';
import Locate from '../../../constant/images/Locate';
import CustomButton from '../../../components/CustomButton';
import CameraSelectModal from '../../../components/CameraSelectModal';
import Text from '../../../components/MyText';

const CreateWalkwayScreen = ({
  navigation,
  item,
  walkwayTitle,
  clickable,
  titleTextChange,
  handlePress,
  address,
  thumbnailImage,
}) => {
  const { distance, image, time, title } = item;
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
    forceJpg: true,
    loadingLabelText: '',
  };

  const iosOptions = {
    height: 1000,
    width: 1000,
  };

  const [isVisible, setIsVisible] = useState(false);
  const openCameraForThumbnail = () => {
    ImageCropPicker.openCamera(
      Platform.OS === 'ios'
        ? { ...baseCameraOption, ...iosOptions }
        : baseCameraOption,
    ).then(async image => {
      const uri = `data:${image.mime};base64,${image.data}`;
      dispatch(setThumbnailImage(uri));
      dispatch(setThumbnailFile(image));

      cancelModal();
    });
  };
  const openImageLibraryForThumbnail = () => {
    ImageCropPicker.openPicker(
      Platform.OS === 'ios'
        ? { ...baseImageLibraryOption, ...iosOptions, multiple: false }
        : baseImageLibraryOption,
    ).then(image => {
      const uri = `data:${image.mime};base64,${image.data}`;
      dispatch(setIsThumbnail(true));

      const imageList = [];
      imageList.push({ imageData: image, image: image.path });

      navigation.navigate('DetailImage', {
        idx: 0,
        images: imageList,
        ver: 'review',
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

  const timeToMin = (time / 60).toFixed(2);

  return (
    <View style={styles.contianer}>
      <ScrollView
        style={styles.contianer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <TouchableWithoutFeedback onPress={openModal}>
            <View style={styles.imageContainer}>
              {image === '' && (
                <View
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CustomImage source={Upload} style={styles.upload} />
                  <Text style={{ color: 'white', marginTop: 16 }}>
                    이미지 가져오기
                  </Text>
                </View>
              )}
              <CustomImage
                source={{ uri: thumbnailImage }}
                style={styles.image}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.writingContainer}>
          <View style={styles.titleWrapper}>
            <MyTextInput
              placeholder="제목"
              style={styles.title}
              onChangeText={titleTextChange}
              value={walkwayTitle}
            />
          </View>
          <CustomImage source={Writing} style={styles.writing} />
          <View style={styles.bottomContainer}>
            <View style={styles.informationContainer}>
              <View style={styles.informationWrapper}>
                <View style={styles.information}>
                  <Text style={styles.informationTitle}>거리</Text>
                    <Text style={styles.num}>
                      {getDistance({ distance: distance, unit: 'm' })}
                    </Text>
                    <Text style={styles.informationDescription}>(m)</Text>
                  </View>
                <View
                  style={{
                    height: '100%',
                    backgroundColor: descriptionColorVer2,
                    width: 1,
                  }}
                />
                <View style={styles.information}>
                  <Text style={styles.informationTitle}>시간</Text>
                    <Text style={styles.num}>
                      {timeToMin > 0 ? timeToMin : time}
                    </Text>
                    <Text style={styles.informationDescription}>
                      {time < 1 ? '(초)' : '(분)'}
                    </Text>
                </View>
              </View>
            </View>
            <View style={styles.locateWrapper}>
              <CustomImage source={Locate} style={styles.locate} />
              <Text style={styles.location}>
                {address === null ? title : address}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        title="작성완료"
        clickable={clickable}
        handlePress={handlePress}
      />
      <CameraSelectModal
        isVisible={isVisible}
        openCamera={openCameraForThumbnail}
        openImageLibrary={openImageLibraryForThumbnail}
        cancelModal={cancelModal}
      />
    </View>
  );
};

export default CreateWalkwayScreen;

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
    backgroundColor: 'rgba(0,0,0,0.3)',
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
  },
  rating: {
    marginStart: 18,
    marginTop: 21.5,
  },
  informationWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgb(90,90,90)',
    paddingVertical: 9,
    flex: 1,
    marginVertical: 27,
  },
  information: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  informationTitle: {
    color: 'rgb(215,215,215)',
  },
  num: {
    fontFamily: boldFontFamily,
    fontSize: 22,
    color: 'white',
    flex: 1,
    textAlign: 'center'
  },
  informationDescription: {
    color: 'white',
    fontSize: 10,
    fontFamily: mediumFontFamily,
    alignSelf: 'flex-end',
  },
  locateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 61.5,
  },
  locate: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  location: {
    color: defaultColor,
  },
  upload: {
    width: 32,
    height: 37,
  },
  cameraContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraWrapper: {
    width: 97,
    height: 97,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(196,196,196)',
  },
  camera: {
    width: 34,
    height: 34,
  },
  value: {
    color: 'white',
    fontFamily: boldFontFamily,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
});
