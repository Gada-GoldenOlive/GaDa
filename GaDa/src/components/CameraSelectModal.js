import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import ImageCropPicker from 'react-native-image-crop-picker';
import Text from './MyText';
import { borderColor } from '../constant/colors';
import { boldFontFamily } from '../constant/fonts';
import { shadowStyle, windowHeight, windowWidth } from '../constant/styles';

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
  maxFiles: 10,
  forceJpg: true,
  loadingLabelText: '',
};
const androidOptions = {
  //...baseOption,
};
const iosOptions = {
  height: 1000,
  width: 1000,
};

const CameraSelectModal = ({
  cancelModal,
  isVisible,
  images,
  handleImages,
}) => {
  const openCamera = () => {
    ImageCropPicker.openCamera(
      Platform.OS === 'ios'
        ? { ...baseCameraOption, ...iosOptions }
        : baseCameraOption,
    ).then(image => {
      const uri = `data:${image.mime};base64,${image.data}`;
      let tmp = [...images];
      handleImages(tmp.concat({ image: uri }));

      () => cancelModal();
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
        images: images,
        ver: 'pin',
      });
      () => cancelModal();
    });
  };
  return (
    <Modal
      style={styles.modalContainer}
      animationIn="slideInUp"
      onBackdropPress={cancelModal}
      hasBackdrop
      deviceHeight={windowHeight}
      deviceWidth={windowWidth}
      backdropColor="gray"
      backdropOpacity={0.6}
      isVisible={isVisible}
    >
      <View style={styles.modalButtonContainer}>
        <Pressable
          onPress={openImageLibrary}
          style={[
            styles.modalButton,
            { borderBottomColor: borderColor, borderBottomWidth: 2 },
          ]}
        >
          <Text style={styles.modalButtonText}>갤러리에서 가져오기</Text>
        </Pressable>
        <Pressable onPress={openCamera} style={styles.modalButton}>
          <Text style={styles.modalButtonText}>지금 찍기</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default CameraSelectModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalButtonContainer: {
    width: 350,
    height: 105,
    backgroundColor: 'white',
    alignItems: 'center',

    marginBottom: 35,
    borderRadius: 12,
    borderColor,
    borderWidth: 2,

    ...shadowStyle,
  },
  modalButton: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontFamily: boldFontFamily,
  },
});
