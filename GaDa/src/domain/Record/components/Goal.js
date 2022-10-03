import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { windowWidth } from '../../../constant/styles';
import { boldFontFamily, mediumFontFamily } from '../../../constant/fonts';
import {
  buttonColor,
  descriptionColorVer2,
  mainColor,
} from '../../../constant/colors';

const Goal = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>시간</Text>
        <Text style={styles.value}>
          <Text style={styles.num}>0</Text>
          <Text style={styles.value}>분</Text>
        </Text>
        <Text style={styles.goal}>목표 미설정</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>거리</Text>
        <Text style={styles.value}>
          <Text style={styles.num}>0</Text>
          <Text style={styles.value}>m</Text>
        </Text>
        <Text style={styles.goal}>목표 미설정</Text>
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
  },
  goal: {
    color: descriptionColorVer2,
    fontSize: 12,
  },
});
