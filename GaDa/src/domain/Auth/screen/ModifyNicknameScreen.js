import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { DefaultProfile } from '../../../constant/images/Sample';
import Writing from '../../../constant/images/Writing';
import { bottomShadowStyle } from '../../../constant/styles';
import MyTextInput from '../../../components/MyTextInput';
import CustomButton from '../../../components/CustomButton';
import { getNicknameIsValid } from '../../../function';
import { useState } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import { setImageFile, setProfileImage } from '../../../redux/modules/images';
import CameraSelectModal from '../../../components/CameraSelectModal';
import {
  getBlob,
  getParam,
  getPreSignedUrl,
  uploadImageToS3,
} from '../../../function/image';
import { useEffect } from 'react';

const ModifyNicknameScreen = ({
  image,
  setImage,
  nicknameChange,
  nickname,
  handlePress,
  isValid,
  isChanged,
  navigation,
}) => {
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
  const dispatch = useDispatch();
  const [cameraVisible, setCameraVisible] = useState(false);

  const openCamera = () => {
    ImageCropPicker.openCamera(
      Platform.OS === 'ios'
        ? { ...baseCameraOption, ...iosOptions }
        : baseCameraOption,
    ).then(async image => {
      
      const uri = `data:${image.mime};base64,${image.data}`;
      setImage(uri);
      dispatch(setImageFile(image));
      cancelModal();
    });
  };

  const openImageLibrary = () => {
    ImageCropPicker.openPicker(
      Platform.OS === 'ios'
        ? { ...baseImageLibraryOption, ...iosOptions }
        : baseImageLibraryOption,
    ).then(image => {
      const uri = `data:${image.mime};base64,${image.data}`;
      setImage(uri);
      dispatch(setImageFile(image));
      const imageList = [];
      imageList.push({ imageData: image, image: image.path });

      navigation.navigate('DetailImage', {
        idx: 0,
        images: imageList,
        ver: 'profile'
      });
      cancelModal();
    });
  };

  const openModal = () => {
    setCameraVisible(true);
  };
  const cancelModal = () => {
    setCameraVisible(false);
  };

  const setImages = items => {
    dispatch(setProfileImage(items));
  };


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {image !== null && image !== '' ? (
          <CustomImage source={{ uri: image }} style={styles.image} />
        ) : (
          <CustomImage source={DefaultProfile} style={styles.image} />
        )}

        <TouchableWithoutFeedback onPress={openModal}>
          <View style={styles.writeWrapper}>
            <CustomImage source={Writing} style={styles.writing} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.textInputWrapper}>
        <MyTextInput
          placeholder="닉네임을 입력하세요"
          style={styles.title}
          onChangeText={nicknameChange}
          value={nickname}
        />
      </View>
      <CustomButton
        title="설정 완료"
        style={styles.button}
        handlePress={handlePress}
        clickable={isChanged}
      />
      <CameraSelectModal
        isVisible={cameraVisible}
        openCamera={openCamera}
        openImageLibrary={openImageLibrary}
        cancelModal={cancelModal}
      />
    </View>
  );
};

export default ModifyNicknameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 76.8,
    alignItems: 'center',
  },
  topContainer: {
    width: 148,
    height: 148,
    alignItems: 'center',
  },
  image: {
    width: 148,
    height: 148,
    borderRadius: 100,
  },
  textInputWrapper: {
    paddingHorizontal: 16,
    width: '100%',
    paddingTop: 78,
  },
  writeWrapper: {
    width: 42,
    height: 42,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderRadius: 100,
    padding: 9,
    ...bottomShadowStyle,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 0,
  },
});
