import React from 'react';
import { Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';
import Text from './MyText';
import { boldFontFamily, boldFontSize } from '../constant/fonts';
import {
    blackColor,
  buttonColor,
  descriptionColor,
} from '../constant/colors';
import { windowHeight, windowWidth } from '../constant/styles';
import CustomImage from './CustomImage';
import CloseIcon from '../constant/images/Close'

const CenterModal = ({
  mainText = '',
  subText = '',
  isVisible = false,
  closeModal,
  handleConfirm,
  renderMainBody = null,
}) => {
  return (
    <Modal
      style={styles.modalContainer}
      animationIn="slideInUp"
      isVisible={isVisible}
      onBackdropPress={closeModal}
      hasBackdrop
      deviceHeight={windowHeight}
      deviceWidth={windowWidth}
      backdropColor="gray"
      backdropOpacity={0.5}
    >
      {renderMainBody ? (
        <View style={styles.modalWrapper}>{renderMainBody()}</View>
      ) : (
        <View style={styles.modalWrapper}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>{mainText}</Text>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <CustomImage style={styles.close} source={CloseIcon}/>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.subContainer}>
                    <Text style={styles.subText}>{subText}</Text>
                </View>
            <TouchableWithoutFeedback onPress={handleConfirm}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>기록시작</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
        
      )}
    </Modal>
  );
};

export default CenterModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    paddingHorizontal: 23
  },
  modalWrapper: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 24,
    paddingHorizontal: 18,
    borderRadius: 15,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontFamily: boldFontFamily,
    lineHeight: 31,
    letterSpacing: -0.4,
    color: blackColor

  },
  close: {
    width: 24,
    height: 24
  },
  subContainer: {
    marginTop: 10,
    marginBottom: 60,
  },
  subText: {
    lineHeight: 20,
    letterSpacing: -0.28,
    color: descriptionColor
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 13,
    borderRadius: 9,
    paddingBottom: 14,
  },
  buttonText: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
    lineHeight: 31,
    letterSpacing: -0.32,
    color: 'white'
  }
});