import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import Text from '../../../components/MyText';
import Modal from 'react-native-modal';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import {
  backgroundColor,
  blackColor,
  borderColor,
  mainColor,
} from '../../../constant/colors';
import { windowHeight, windowWidth } from '../../../constant/styles';
import CustomImage from '../../../components/CustomImage';
import { Sample } from '../../../constant/images/Temp';
import StarIcon from '../../../constant/images/Star';
import PinInformation from './PinInformation';
import { GadaCheck } from '../../../constant/images/Check';
import { getDistance } from '../../../function';
import { deleteWalkway } from '../../../APIs/walkway';
import { useSelector } from 'react-redux';
const WalkwayOverview = ({
  walkWay,
  handleOverview,
  isVisible,
  closeModal,
}) => {
  const {
    address = {},
    averageStar = 0,
    creator = '',
    creatorId = '',
    distance = 0,
    id = '',
    path = [],
    pinCount = 0,
    time = 0,
    title = '',
    image = '',
  } = walkWay;
  const min = Math.floor(time / 60);
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: '복사 성공',
      text2: address,
    });
  };

  const copyToClipboard = async () => {
    Clipboard.setString(address);
    showToast();

  };
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
      coverScreen={false}
      onBackButtonPress={() => closeModal()}
    >
      <TouchableWithoutFeedback onPress={handleOverview}>
        <View style={styles.modalWrapper}>
          <View style={styles.bar} />
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {image !== 'undefined' ? (
                <CustomImage source={{ uri: image }} style={styles.image} />
              ) : (
                <CustomImage source={Sample} style={styles.image} />
              )}
              <View style={styles.imageGradient} />
              <View style={styles.imageWrapper}>
                <CustomImage source={StarIcon} style={styles.starIcon} />
                <Text style={styles.num}>{averageStar}</Text>
              </View>
            </View>
            <View style={styles.informationContainer}>
              <View style={styles.textContainer}>
                {creator === '스마트서울맵' ? (
                  <View style={styles.creatorWrapper}>
                    <Text style={styles.name}>GaDa 공식 산책로</Text>
                    <CustomImage style={styles.star} source={GadaCheck} />
                  </View>
                ) : (
                  <View style={styles.creatorWrapper}>
                    <Text style={styles.name}>{creator}</Text>
                  </View>
                )}
                <Text style={styles.title}>{title}</Text>
                <Text>
                  <Text style={styles.description}>
                    약 {time > 0 ? min : 0}분/
                  </Text>
                  <Text style={styles.description}>
                    {distance > 0 ? getDistance({ distance, unit: 'km' }) : 0.0}
                    km/
                  </Text>
                  <Text style={styles.description}>핀 {pinCount}개 </Text>
                </Text>
              </View>
              <View style={styles.bottomContainer}>
                <TouchableWithoutFeedback onPress={() => copyToClipboard()}>
                  <View style={styles.bottomWrapper}>
                    <Text style={styles.bottomText}>주소복사</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default WalkwayOverview;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: -20,
  },
  modalWrapper: {
    width: windowWidth,
    paddingTop: 12,
    paddingBottom: 25,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bar: {
    backgroundColor: borderColor,
    borderRadius: 2.5,
    width: 50,
    height: 4,
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingTop: 23,
  },
  imageContainer: {
    width: 96,
    height: 96,
  },
  imageGradient: {
    backgroundColor: 'rgba(0,0,0,0.04)',
    position: 'absolute',
    bottom: 0,
    start: 0,
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    width: windowWidth,
    height: '100%',
    bottom: 0,
  },
  imageWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 9.7,
    paddingBottom: 8.6,
  },
  image: {
    width: 96,
    height: 96,
  },
  num: {
    fontFamily: boldFontFamily,
    color: 'white',
  },
  informationContainer: {
    flex: 1,
    paddingStart: 16,
    justifyContent: 'flex-start',
  },
  textContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  name: {
    color: mainColor,
    fontFamily: boldFontFamily,
    fontSize: 13,
    letterSpacing: -0.26,
  },
  star: {
    width: 16,
    height: 16,
    marginStart: 4,
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
  },
  bottomContainer: {
    height: 30,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    zIndex: 999,
  },
  bottomWrapper: {
    paddingHorizontal: 12,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: 'rgb(248,248,248)',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starIcon: {
    width: 18,
    height: 18,
    marginRight: 5.7,
  },
  buttonContainer: {
    width: windowWidth,
    height: 44,
    bottom: 0,
    position: 'absolute',
    zIndex: 999,
  },
  creatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 4,
  },
});
