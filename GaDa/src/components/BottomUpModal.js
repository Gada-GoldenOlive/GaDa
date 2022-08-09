import React from 'react';
import { Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';
import Text from './MyText';
import { boldFontFamily, boldFontSize } from '../constant/fonts';
import {
  backgroundColor,
  blackColor,
  borderColor,
  descriptionColor,
  emphasisColor,
  mainColor,
} from '../constant/colors';
import { windowHeight, windowWidth } from '../constant/styles';
import CustomImage from './CustomImage';
import {Sample} from '../constant/images/Temp';
import StarIcon from '../constant/images/Star';

const BottomUpModal = ({
  mainText = '',
  subText = '',
  isVisible = false,
  closeModal,
  handleConfirm,
  version = 1,
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
           <View style={styles.bar} />
           <View style={styles.container}>
           <View style={styles.imageContainer}>
           <CustomImage source={Sample} style={styles.image} />
           <View style={styles.gradient} />
            <View style={styles.imageWrapper}>
              <CustomImage source={StarIcon} style={styles.starIcon}/>
              <Text style={styles.num}>4.3</Text>
            </View>
           </View>
           <View style={styles.informationContainer}>
            <Text style={styles.name}>성수동불주먹</Text>
            <Text style={styles.title}>성동구 왕십리로 산책길</Text>
            <Text>
              <Text style={styles.description}>약 25분 / </Text>
              <Text style={styles.description}>1.25km</Text>
              <Text style={styles.description}> / 핀 3개 </Text>
            </Text>
           </View>
           </View>
           <View style={styles.bottomContainer}>
            <TouchableWithoutFeedback >
              <View style={styles.bottomWrapper}>
                <Text style={styles.bottomText}>주소복사</Text>
              </View>
            </TouchableWithoutFeedback>
           </View>
        </View>
      )}
    </Modal>
  );
};

export default BottomUpModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: 44,
  },
  modalWrapper: {
    backgroundColor: 'white',
    width: windowWidth,
    paddingTop: 12,
    paddingBottom: 25,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  bar: {
    backgroundColor: backgroundColor,
    borderRadius: 2.5,
    width: 50,
    height: 4,
    alignSelf: 'center'
  },
  container: {
    flexDirection: 'row',
    paddingTop: 23,
  },
  imageContainer: {
    width: 96,
    height: 96,

  },
  gradient: {
    position: 'absolute',
    width:'100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  imageWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 9.7,
    paddingBottom: 8.6
  },
  image: {
    width: 96,
    height: 96
  },
  num: {
    fontFamily: boldFontFamily,
    color: 'white'
  },
  informationContainer: {
    flex: 1,
    paddingStart: 16,
  },
  name: {
    color: mainColor,
    fontFamily: boldFontFamily,
    fontSize: 13,
    letterSpacing: -0.26,
    marginBottom: 4,
  },
  title: {
    fontFamily: boldFontFamily,
    letterSpacing: -0.28,
    color: blackColor,
    marginBottom: 5,
  },
  description: {
    letterSpacing: -0.28,
    color: 'rgb(137,137,137)',
    letterSpacing: -0.28
  },
  bottomContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  bottomWrapper: {
    paddingHorizontal: 12,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: 'rgb(248,248,248)'

  },
  starIcon: {
    width: 9,
    height: 9,
    marginRight: 5.7
  }

});