import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import WritingFrame from '../../../components/WritingFrame';
import MyTextInput from '../../../components/MyTextInput';
import CustomImage from '../../../components/CustomImage';
import Writing from '../../../constant/images/Writing';
import Text from '../../../components/MyText';
import {
  borderColorVer2,
  buttonColor,
  defaultColor,
  descriptionColorVer2,
} from '../../../constant/colors';
import Locate from '../../../constant/images/Locate';
import CustomButton from '../../../components/CustomButton';
import CameraSelectModal from '../../../components/CameraSelectModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setImageFileList,
  setWalkwayImages,
} from '../../../redux/modules/images';
import Camera from '../../../constant/images/Camera';
import CustomRating from '../../../components/CustomRating';
import { windowHeight, windowWidth } from '../../../constant/styles';
import { getDistance } from '../../../function';
import { boldFontFamily, mediumFontFamily } from '../../../constant/fonts';
import ImageCropPicker from 'react-native-image-crop-picker';
import ReviewImageList from '../components/ReviewImageList';
import Upload from '../../../constant/images/Upload';
const CreateWalkwayScreen = ({
  navigation,
  walkwayTitle = '',
  content = '',
  titleTextChange,
  contentTextChange,
  item,
  rate,
  clickable,
  walkwayImages,
  setRate,
  imageFileList,
  handlePress,
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
    multiple: true,
    // maxFiles: 10,
    forceJpg: true,
    loadingLabelText: '',
  };

  const iosOptions = {
    height: 1000,
    width: 1000,
  };

  const [isVisible, setIsVisible] = useState(false);
  const [temp, setTemp] = useState([]);
  const openCamera = () => {
    ImageCropPicker.openCamera(
      Platform.OS === 'ios'
        ? { ...baseCameraOption, ...iosOptions }
        : baseCameraOption,
    ).then(async image => {
      const uri = `data:${image.mime};base64,${image.data}`;
      setTemp(prev => [...prev, { url: uri }]);
      dispatch(setWalkwayImages([...walkwayImages, { url: uri }]));
      dispatch(setImageFileList([...imageFileList, image]));
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
      images.map(item => imageList.push({ imageData: item, image: item.path }));
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
              <CustomImage source={{ uri: image }} style={styles.image} />
              {image === '' && (
                <CustomImage source={Upload} style={styles.upload} />
              )}
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
          <View
            style={{
              minHeight: 200,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <MyTextInput
              placeholder={'산책로에 대해 설명해주세요'}
              style={[styles.multiLine, { borderBottomWidth: 0 }]}
              multiline
              onChangeText={contentTextChange}
              value={content}
            />
          </View>
          <View style={styles.cameraContainer}>
            <TouchableWithoutFeedback onPress={openModal}>
              <View style={styles.cameraWrapper}>
                <CustomImage style={styles.camera} source={Camera} />
              </View>
            </TouchableWithoutFeedback>
            <ReviewImageList images={walkwayImages} handleNavigate={null} />
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.informationContainer}>
              <CustomRating
                style={styles.rating}
                size={40}
                score={rate}
                onPress={setRate}
                starMargin={(windowWidth - 34 - 34 - 200) / 5}
                tintColor={buttonColor}
              />
              <View style={styles.informationWrapper}>
                <View
                  style={[
                    styles.information,
                    {
                      borderEndColor: descriptionColorVer2,
                      borderEndWidth: 0.4,
                    },
                  ]}
                >
                  <Text style={styles.informationTitle}>거리</Text>
                  <Text style={styles.num}>
                    {getDistance({ distance: distance, unit: 'm' })}
                  </Text>
                  <Text style={styles.informationDescription}>(m)</Text>
                </View>
                <View
                  style={[
                    styles.information,
                    {
                      borderStartColor: descriptionColorVer2,
                      borderStartWidth: 0.6,
                    },
                  ]}
                >
                  <Text style={styles.informationTitle}>시간</Text>
                  <Text style={styles.num}>{time}</Text>
                  <Text style={styles.informationDescription}>(분)</Text>
                </View>
              </View>
            </View>
            <View style={styles.locateWrapper}>
              <CustomImage source={Locate} style={styles.locate} />
              <Text style={styles.location}>{title}</Text>
            </View>
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
      <CustomButton
        title="작성완료"
        clickable={clickable}
        handlePress={handlePress}
      />
      <CameraSelectModal
        isVisible={isVisible}
        openCamera={openCamera}
        openImageLibrary={openImageLibrary}
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
  rating: {
    marginStart: 18,
    marginTop: 21.5,
  },
  informationWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgb(90,90,90)',
    paddingVertical: 8,
    flex: 1,
    marginVertical: 27,
  },
  information: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 38,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  informationTitle: {
    color: 'rgb(215,215,215)',
  },
  num: {
    fontFamily: boldFontFamily,
    fontSize: 22,
    color: 'white',
  },
  informationDescription: {
    color: 'white',
    fontSize: 10,
    fontFamily: mediumFontFamily,
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
  upload: {
    position: 'absolute',
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
});
