import { StyleSheet, View } from 'react-native';
import React from 'react';
import { windowWidth } from '../../../constant/styles';
import { boldFontFamily, mediumFontFamily } from '../../../constant/fonts';
import {
  buttonColor,
  descriptionColorVer2,
  mainColor,
} from '../../../constant/colors';
import { getDistance, getHour } from '../../../function';
import Text from '../../../components/MyText';

const Goal = ({ goal }) => {
  const { loginId, goalDistance, goalTime, totalDistance, totalTime } = goal;
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>시간</Text>
        <Text style={styles.value}>
          <Text style={styles.num}>{getHour(totalTime)}</Text>
        </Text>
        {goalTime === null ? (
          <Text style={styles.goal}>목표 미설정</Text>
        ) : (
          <Text style={styles.goal}>목표 : {getHour(goalTime)}</Text>
        )}
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>거리</Text>
        <Text style={styles.value}>
          <Text style={styles.num}>{getDistance({distance:totalDistance, unit:'m'})}</Text>
          <Text style={styles.value}>m</Text>
        </Text>
        {goalDistance === null ? (
          <Text style={styles.goal}>목표 미설정</Text>
        ) : (
          <Text style={styles.goal}>목표 : {getDistance({distance: goalDistance, unit:'m'})}m</Text>
        )}
      </View>
    </View>
  );
};

export default Goal;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 24,
    flexDirection: 'row',
  },
  wrapper: {
    width: (windowWidth - 32 - 10) / 2,
    backgroundColor: 'rgb(251,251,253)',
    borderRadius: 20,
    borderColor: 'rgb(240,240,243)',
    borderWidth: 1,
    marginEnd: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 18,
    paddingBottom: 24,
  },
  title: {
    fontFamily: mediumFontFamily,
    color: descriptionColorVer2,
    marginBottom: 10,
  },
  value: {
    color: buttonColor,
    fontFamily: boldFontFamily,
  },
  num: {
    fontSize: 30,
    color: buttonColor,
  },
  goal: {
    color: descriptionColorVer2,
    fontSize: 12,
  },
});
