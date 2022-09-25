import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import Text from '../components/MyText';
import moment from 'moment';
import CustomButton from '../components/CustomButton';
import { boldFontFamily, mediumFontFamily } from '../constant/fonts';
import { blackColor, buttonColor, defaultColor, descriptionColorVer2 } from '../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight, windowWidth } from '../constant/styles';
import { useSelector } from 'react-redux';

const WalkEnd = ({
  pinNum: prevNum = 0,
  isVisible = false,
  onPress,
  walkData,
}) => {
  const { time, distance, finishStatus, walkwayId, userId } = walkData;
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time - hour * 3600) / 60);
  const sec = Math.floor(time - hour * 3600 - min * 60);
  const { pinNum } = useSelector(state => state.status);
  const timeString = `${hour}:${min}:${sec}`;
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
            <Text style={styles.kmNum}>{distance}</Text>
            <Text style={styles.km}>m</Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomWrapper}>
              <Text style={styles.description}>시간</Text>
              <Text style={styles.value}>{timeString}</Text>
            </View>
            <View style={styles.bottomWrapper}>
              <Text style={styles.description}>제작 핀</Text>
              <Text style={styles.value}>{pinNum}</Text>
            </View>
          </View>
        </View>
        <CustomButton title="다음" handlePress={onPress} />
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
    paddingTop: Platform.OS === 'android' ? 33 : 133,
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
    color: descriptionColorVer2,
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
    color: descriptionColorVer2,
    marginBottom: 5,
  },
  value: {
    fontFamily: boldFontFamily,
    fontSize: 30,
    color: defaultColor,
  },
});
