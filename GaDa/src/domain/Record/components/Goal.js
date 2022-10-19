import { StyleSheet, View } from 'react-native';
import React from 'react';
import { windowWidth } from '../../../constant/styles';
import {
  boldFontFamily,
  defaultFontFamily,
  mediumFontFamily,
} from '../../../constant/fonts';
import {
  buttonColor,
  descriptionColorVer2,
  mainColor,
} from '../../../constant/colors';
import { getDistance, getGoalHour, getHour, getHourWithMin } from '../../../function';
import Text from '../../../components/MyText';
import { useState } from 'react';

const Goal = ({ goal }) => {
  const { loginId, goalDistance, goalTime, totalDistance, totalTime } = goal;
  console.log(totalTime);
  const hour = getGoalHour(totalTime)[0];
  const min = getGoalHour(totalTime)[1];
  const sec = hour === '' || min === '' ? getGoalHour(totalTime)[2] : ''
  const res = hour.toString() + min.toString() + sec.toString();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>시간</Text>
        <View
          style={[
            styles.valueWrapper,
            res.length > 4 && { flexDirection: 'column' },
          ]}
        >
          {hour !== '' && (
            <Text>
              <Text style={styles.num}>{hour}</Text>
              <Text style={styles.value}>시간 </Text>
            </Text>
          )}
          {min !== '' && (
            <Text style={{ fontFamily: defaultFontFamily }}>
              <Text style={styles.num}>{min}</Text>
              <Text style={styles.value}>분</Text>
            </Text>
          )}
          {sec !== '' && (
            <Text style={{ fontFamily: defaultFontFamily }}>
              <Text style={styles.num}>{sec}</Text>
              <Text style={styles.value}>초</Text>
            </Text>
          )}
        </View>
        {goalTime === null ? (
          <Text style={styles.goal}>목표 미설정</Text>
        ) : (
          <Text style={styles.goal}>목표 : {getHourWithMin(goalTime)}</Text>
        )}
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>거리</Text>
        <View style={styles.valueWrapper}>
          <Text style={styles.num}>
            {getDistance({ distance: totalDistance, unit: 'm' })}
          </Text>
          <Text style={styles.value}>m</Text>
        </View>
        {goalDistance === null ? (
          <Text style={styles.goal}>목표 미설정</Text>
        ) : (
          <Text style={styles.goal}>
            목표 : {getDistance({ distance: goalDistance, unit: 'm' })}m
          </Text>
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
    color: mainColor,
    fontFamily: boldFontFamily,
    fontSize: 20,
    alignSelf: 'flex-end',
  },
  num: {
    color: mainColor,
    fontSize: 30,
    color: buttonColor,
  },
  goal: {
    color: descriptionColorVer2,
    fontSize: 12,
  },
  valueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
});
