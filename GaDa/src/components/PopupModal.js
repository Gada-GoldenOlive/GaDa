import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import Text from './MyText';
import { windowHeight, windowWidth } from '../constant/styles';
import { boldFontFamily } from '../constant/fonts';
import CustomImage from './CustomImage';
import CloseIcon from '../constant/images/Close';
import Modal from 'react-native-modal';

const PopupModal = ({
  isPopupVisible,
  closePopup,
  handleConfirmButton,
  content = { title: '', description: '', button: '' },
}) => {
  return (
    <Modal
      style={styles.popUpContainer}
      isVisible={isPopupVisible}
      hasBackDrop
      onBackdropPress={closePopup}
      deviceHeight={windowHeight}
      deviceWidth={windowWidth}
      backdropColor={'black'}
      backdropOpacity={0.5}
      onBackButtonPress={() => closePopup()}
    >
      <View style={styles.popUpWrapper}>
        <View style={styles.popUpTitleWrapper}>
          <View>
            <Text style={styles.popUpTitle}>{content.title}</Text>
          </View>
          {/* <View> */}
          <TouchableWithoutFeedback onPress={closePopup}>
            <CustomImage
              source={CloseIcon}
              style={{ width: 24, height: 24 }}
              tintColor="black"
            />
          </TouchableWithoutFeedback>
          {/* </View> */}
        </View>
        <View style={styles.popUpTextWrapper}>
          <Text style={styles.popUpText}>{content.description}</Text>
        </View>
        <TouchableWithoutFeedback onPress={handleConfirmButton}>
          <View style={styles.popUpConfirmButtonWrapper}>
            <Text style={styles.popUpConfirmButtonText}>{content.button}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* </View> */}
    </Modal>
  );
};

export default PopupModal;

const styles = StyleSheet.create({
  popUpBackground: {
    opacity: 0.5,
    position: 'absolute',
    // zIndex: 2000,
    top: 0,
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  popUpContainer: {
    // position: 'absolute',
    // zIndex: 2000,

    // width: '100%',
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUpWrapper: {
    width: windowWidth - 41 * 2,

    paddingTop: 30,
    paddingBottom: 24,
    paddingHorizontal: 18,

    backgroundColor: 'white',
    opacity: 1,
    borderRadius: 15,
  },
  popUpTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  popUpTitle: {
    fontFamily: boldFontFamily,
    fontSize: 20,
    lineHeight: 31,
    letterSpacing: -0.4,
    color: 'black',
  },
  closeIcon: {},
  popUpTextWrapper: {
    marginTop: 10,
  },
  popUpText: {
    color: '#8d8d8d',
    lineHeight: 20,
    letterSpacing: -0.28,
  },
  popUpConfirmButtonWrapper: {
    marginTop: 60,
    backgroundColor: '#49d492',
    // paddingHorizontal: 81,
    paddingVertical: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
  },
  popUpConfirmButtonText: {
    fontFamily: boldFontFamily,
    fontSize: 16,
    lineHeight: 31,
    letterSpacing: -0.32,
    color: 'white',
  },
});
