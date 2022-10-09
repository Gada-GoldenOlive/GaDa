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
import CustomButton from '../../../components/CustomButton';

const GoalSettingScreen = ({ time, distance, timeChange, distanceChange, updateGoal }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>달성목표</Text>
      <View style={styles.wrapper}>
        <MyTextInput
          value={time}
          onChangeText={timeChange}
          style={styles.textInput}
          keyboardType="numeric"
          placeholder={time === null ? '목표 달성시간을 입력하세요' : time.toString()}
        />
        <Text style={styles.description}>(시간)</Text>
      </View>
      <View style={styles.wrapper}>
        <MyTextInput
          value={distance}
          onChangeText={distanceChange}
          style={styles.textInput}
          keyboardType="numeric"
          placeholder={
            distance === null ? '목표 달성거리를 입력하세요' : distance.toString()
          }
        />
        <Text style={styles.description}>(m)</Text>
      </View>
      {time && distance && <CustomButton style={styles.button} handlePress={updateGoal} title="설정 완료"/>}
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
  button: {
    position: 'absolute',
    bottom: 0,
  }
});
