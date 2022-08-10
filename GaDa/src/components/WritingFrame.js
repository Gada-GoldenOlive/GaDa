import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomImage from './CustomImage';
import Upload from '../constant/images/Upload';
import { windowHeight, windowWidth } from '../constant/styles';
import { defaultColor } from '../constant/colors';
import MyTextInput from './MyTextInput';
import CustomButton from './CutomButton';
import { boldFontFamily } from '../constant/fonts';
import Text from './MyText';
import CameraSelectModal from './CameraSelectModal';
import setPinImages from '../redux/modules/images';
const WritingFrame = ({
  title = '',
  content = '',
  address = '',
  titlePlaceHolder = '',
  contentPlaceholder = '',
  titleTextChange = {},
  contentTextChange = {},
  buttonTitle = '',
  images,
  handleImages,
}) => {
  const [visible, setVisible] = useState(false);
  const openCamera = () => {
    setVisible(true);
  };
  const cancelModal = () => {
    setVisible(false);
  };

  return (
    <View style={styles.contianer}>
      <ScrollView style={styles.contianer}>
        <TouchableWithoutFeedback onPress={openCamera}>
          <View style={styles.imageContainer}>
            <View style={styles.graient} />
            <CustomImage source={Upload} style={styles.image} />
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
        isVisible={visible}
        cancelModal={cancelModal}
        images={images}
        handleImages={handleImages}
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
    width: 32,
    height: 37,
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
