import React from 'react';
import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Text from '../../../components/MyText';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import {
  backgroundColor,
  blackColor,
  mainColor,
} from '../../../constant/colors';
import { windowHeight, windowWidth } from '../../../constant/styles';
import CustomImage from '../../../components/CustomImage';
import { Sample } from '../../../constant/images/Temp';
import StarIcon from '../../../constant/images/Star';
import LinearGradient from 'react-native-linear-gradient';

const PinInformation = ({
  mainText = '',
  subText = '',
  isVisible = false,
  closeModal,
  handleConfirm,
  version = 1,
  renderMainBody = null,
}) => {
  return (
    <View
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
              <View style={styles.imageGradient} />
              <View style={styles.imageWrapper}>
                <CustomImage source={StarIcon} style={styles.starIcon} />
                <Text style={styles.num}>4.3</Text>
              </View>
            </View>
            <View style={styles.informationContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>성수동불주먹</Text>
                <Text style={styles.title}>성동구 왕십리로 산책길</Text>
                <Text>
                  <Text style={styles.description}>약 25분 / </Text>
                  <Text style={styles.description}>1.25km</Text>
                  <Text style={styles.description}> / 핀 3개 </Text>
                </Text>
              </View>
              <View style={styles.bottomContainer}>
                <TouchableWithoutFeedback>
                  <View style={styles.bottomWrapper}>
                    <Text style={styles.bottomText}>주소복사</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default PinInformation;

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    ////alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    width: windowWidth,
    paddingTop: 12,
    paddingBottom: 25,
    paddingHorizontal: 16,
  },
  bar: {
    backgroundColor: backgroundColor,
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
    flexDirection: 'column',
  },
  textContainer: {
    flex: 1,
    width: '100%',
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
  },
  bottomContainer: {
    height: 30,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  bottomWrapper: {
    paddingHorizontal: 12,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: 'rgb(248,248,248)',
    borderRadius: 3,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginRight: 5.7,
  },
});