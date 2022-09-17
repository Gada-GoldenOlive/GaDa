import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyTextInput from '../../../components/MyTextInput';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import {
  backgroundColor,
  blackColor,
  descriptionColor,
  descriptionColorVer2,
} from '../../../constant/colors';

const GoalSettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>달성목표</Text>
      <View style={styles.wrapper}>
        <MyTextInput
          style={styles.textInput}
          placeholder="목표 달성시간을 입력하세요"
        />
        <Text style={styles.description}>(시간)</Text>
      </View>
      <View style={styles.wrapper}>
        <MyTextInput
          style={styles.textInput}
          placeholder="목표 달성거리를 입력하세요"
        />
        <Text style={styles.description}>(km)</Text>
      </View>
    </View>
  );
};

export default GoalSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 38.8,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
    color: blackColor,
    marginBottom: 9,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 21.5,
  },
  textInput: {
    paddingTop: 16,
    paddingBottom: 18,
  },
  description: {
    position: 'absolute',
    end: 0,
    top: 16,
    color: descriptionColorVer2,
  },
});
