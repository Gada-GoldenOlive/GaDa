import { StyleSheet, View } from 'react-native';
import React from 'react';
import Text from '../components/MyText';
import moment from 'moment';
import CustomButton from '../components/CustomButton';
import { boldFontFamily, mediumFontFamily } from '../constant/fonts';
import { blackColor, buttonColor, defaultColor } from '../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight, windowWidth } from '../constant/styles';

const WalkEnd = ({
  km = 103,
  time: secs = moment().startOf('second'),
  pinNum = 1,
  isVisible = false,
}) => {
  const hour = secs.hours();
  const min = secs.minute();
  const sec = secs.second();
  const time = `${hour}:${min}:${sec}`;
  return (
    isVisible && (
      <View style={styles.container}>
        <LinearGradient
          colors={['white', 'rgba(255,255,255,0)']}
          style={styles.linear}
        />
        <View style={styles.informationContainer}>
          <Text style={styles.closeText}>산책이 종료되었습니다</Text>
          <View style={styles.kmContainer}>
            <Text style={styles.kmNum}>{km}</Text>
            <Text style={styles.km}>km</Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomWrapper}>
              <Text style={styles.description}>시간</Text>
              <Text style={styles.value}>{time}</Text>
            </View>
            <View style={styles.bottomWrapper}>
              <Text style={styles.description}>제작 핀</Text>
              <Text style={styles.value}>{pinNum}</Text>
            </View>
          </View>
        </View>
        <CustomButton title="다음" />
      </View>
    )
  );
};

export default WalkEnd;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    height: '100%',
    width: windowWidth,
    paddingStart: 24,
    paddingTop: 33,
  },
  informationContainer: {},
  closeText: {
    fontFamily: boldFontFamily,
    fontSize: 20,
    color: blackColor,
  },
  kmContainer: {
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  kmNum: {
    fontFamily: boldFontFamily,
    fontSize: 74,
    color: buttonColor,
    marginEnd: 13,
  },
  km: {
    fontSize: 28,
    color: 'rgb(158,158,158)',
    marginBottom: 13,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 9,
    height: '100%',
  },
  linear: {
    width: windowWidth,
    height: '100%',
    position: 'absolute',
  },
  bottomWrapper: {
    marginEnd: 45,
  },
  description: {
    fontFamily: mediumFontFamily,
    color: 12,
    color: 'rgb(158,158,158)',
    marginBottom: 5,
  },
  value: {
    fontFamily: boldFontFamily,
    fontSize: 30,
    color: defaultColor,
  },
});
