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
import { setProfileImage } from '../../../redux/modules/images';
import CameraSelectModal from '../../../components/CameraSelectModal';
import { getParam, getPreSignedUrl, uploadImageToS3 } from '../../../function/image';
import { useEffect } from 'react';

import {s3} from '../../../constant/setting';
const ModifyNicknameScreen = ({
  image,
  nicknameChange,
  nickname,
  handlePress,
  isValid,
  navigation,
}) => {
  const dispatch = useDispatch();
  const [uri, setUri] = useState('');
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

  const [cameraVisible, setCameraVisible] = useState(false);
  const openCamera = () => {
    ImageCropPicker.openCamera(
      Platform.OS === 'ios'
        ? { ...baseCameraOption, ...iosOptions }
        : baseCameraOption,
    ).then(image => {
      const param = getParam(image);
      s3.upload(param, (err, data) => {
        if (err) {
          console.log('image upload err: ' + err);
          return;
        }
        const imgTag = `${data.Location}`;
        setUri(imgTag);
      });

    });
  };

  useEffect(() =>{
    console.log(uri)
  },[uri])

  const handleImage = async image => {
    const res = await uploadImageToS3(image);
    console.log(res);
    cancelModal();
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

  const getURL = async () => {
    const res = await getPreSignedUrl();
    if (res) {
      const { url } = res;
      console.log(url);
    }
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
        clickable={isValid}
      />
      <CameraSelectModal
        isVisible={cameraVisible}
        openCamera={openCamera}
        openImageLibrary={getURL}
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
