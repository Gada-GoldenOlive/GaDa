import {
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import MyTextInput from '../../../components/MyTextInput';
import { blackColor, errorColor } from '../../../constant/colors';
import CustomButton from '../../../components/CustomButton';
import Text from '../../../components/MyText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ModifyPWScreen = ({
  current,
  currentChange,
  currentWrong,
  newText,
  newChange,
  newWrong,
  check,
  checkChange,
  checkWrong,
  changePW,
  clickable,
}) => {
  const { StatusBarManager } = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    Platform.OS === 'ios' &&
      StatusBarManager.getHeight(statusBarFrameData => {
        setStatusBarHeight(statusBarFrameData.height);
      });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      keyboardVerticalOffset={statusBarHeight + 44}
      behavior={Platform.OS === 'ios' && 'padding'}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        bounces={false}
        scrollEnabled
        enableOnAndroid
        enableAutomaticScroll
        keyboardShouldPersistTaps
        extraScrollHeight={Platform.OS === 'android' ? 0 : -100}
      >
        <View style={styles.container}>
          <Text style={styles.title}>비밀번호 변경</Text>
          <View style={styles.titleWrapper}>
            <MyTextInput
              placeholder="현재 비밀번호 입력"
              style={[
                styles.textinput,
                currentWrong && {
                  borderBottomColor: errorColor,
                  borderBottomWidth: 2,
                },
              ]}
              onChangeText={currentChange}
              value={current}
              secureTextEntry={true}
            />
            {currentWrong && (
              <Text style={styles.error}>
                * 현재 비밀번호와 일치하지 않습니다
              </Text>
            )}
            <MyTextInput
              placeholder="새 비밀번호 입력(6글자 이상)"
              style={[
                styles.textinput,
                (newWrong || checkWrong) && {
                  borderBottomColor: errorColor,
                  borderBottomWidth: 2,
                },
              ]}
              onChangeText={newChange}
              value={newText}
              secureTextEntry={true}
            />
            {newWrong && (
              <Text style={styles.error}>
                * 영어 대/소문자, 숫자, 특수문자 조합 8글자 이상
              </Text>
            )}
            <MyTextInput
              placeholder="새 비밀번호 확인"
              style={[
                styles.textinput,
                checkWrong && {
                  borderBottomColor: errorColor,
                  borderBottomWidth: 2,
                },
              ]}
              onChangeText={checkChange}
              value={check}
              secureTextEntry={true}
            />
            {checkWrong && (
              <Text style={styles.error}>* 비밀번호가 일치하지 않습니다</Text>
            )}
          </View>

        </View>
      </KeyboardAwareScrollView>
      <CustomButton
            style={styles.button}
            title="설정완료"
            clickable={clickable}
            handlePress={changePW}
          />
    </KeyboardAvoidingView>
  );
};

export default ModifyPWScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 38.8,
    paddingHorizontal: 16,
    flex: 1,
  },
  title: {
    fontFamily: boldFontFamily,
    fontSize: boldFontSize,
    color: 'black',
  },
  textinput: {
    fontFamily: boldFontFamily,
    fontSize: 16,
    color: blackColor,
    //marginBottom: 22,
  },
  error: {
    color: errorColor,
    marginTop: 5,
  },
  button: {
    position: 'absolute',
    bottom: 0,
  },
});
