import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import MyTextInPut from '../../../components/MyTextInput';
import {
  blackColor,
  descriptionColor,
  descriptionColorVer2,
} from '../../../constant/colors';
import CustomButton from '../../../components/CustomButton';
import Text from '../../../components/MyText';
import { thinFontFamily } from '../../../constant/fonts';

const NicknameScreen = ({
  isValid,
  isOK,
  duplicated,
  handleCheckDuplicate,
  name,
  handleNavigate,
  handleNicknameChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>닉네임을 설정하세요</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentWrapper}>
          <MyTextInPut
            style={styles.textInput}
            placeholder="닉네임을 입력하세요"
            value={name}
            onChangeText={handleNicknameChange}
          />
          {isValid && (
            <TouchableWithoutFeedback onPress={handleCheckDuplicate}>
              <View style={styles.buttonWrapper}>
                <Text style={styles.buttonText}>중복확인</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        {duplicated && (
          <Text style={styles.errorText}>*중복된 아이디입니다</Text>
        )}
      </View>

      <CustomButton
        title="다음"
        handlePress={handleNavigate}
        clickable={isOK}
      />
    </View>
  );
};

export default NicknameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 27,
    lineHeight: 40,
    color: blackColor,
    fontFamily: thinFontFamily,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 130,
    paddingHorizontal: 16,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderBottomColor: descriptionColorVer2,
  },
  buttonWrapper: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: blackColor,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
  errorText: {
    marginTop: 9.5,
    color: 'rgb(255,92,0)',
  },
});
