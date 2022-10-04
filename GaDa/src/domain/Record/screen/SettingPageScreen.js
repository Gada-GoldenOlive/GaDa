import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { ArrowBlack } from '../../../constant/images/Arrow';
import {
  borderColorVer2,
  defaultColor,
  descriptionColor,
} from '../../../constant/colors';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import Text from '../../../components/MyText';

const SettingPageScreen = ({handleNaigateNickname, handleNavigatePW, handleLogout}) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleNaigateNickname}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonTitle}>이름 / 닉네임 설정</Text>
          <CustomImage style={styles.arrow} source={ArrowBlack} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleNavigatePW}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonTitle}>비밀번호 재설정</Text>
          <CustomImage style={styles.arrow} source={ArrowBlack} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleLogout}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonTitle}>로그아웃</Text>
          <CustomImage style={styles.arrow} source={ArrowBlack} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleNaigateNickname}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonTitle}>회원 탈퇴</Text>
          <CustomImage style={styles.arrow} source={ArrowBlack} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SettingPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24.8,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderBottomColor: borderColorVer2,
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 21.5,
  },
  buttonTitle: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
  },
  arrow: {
    width: 16,
    height: 16,
  },
});
