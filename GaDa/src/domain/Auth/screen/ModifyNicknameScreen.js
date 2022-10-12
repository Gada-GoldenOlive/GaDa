import { KeyboardAvoidingView, NativeModules, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { DefaultProfile } from '../../../constant/images/Sample';
import Writing from '../../../constant/images/Writing';
import { bottomShadowStyle } from '../../../constant/styles';
import MyTextInput from '../../../components/MyTextInput';
import CustomButton from '../../../components/CustomButton';
import { getNicknameIsValid } from '../../../function';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
import { useEffect } from 'react';
const ModifyNicknameScreen = ({
  image,
  nicknameChange,
  nickname,
  handlePress,
  isValid,
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
        extraScrollHeight={Platform.OS === 'android' ? 100 : -100}
      >
        <View style={styles.container}>
          <View style={styles.topContainer}>
            {image !== null && image !== '' ? (
              <CustomImage source={{ uri: image }} style={styles.image} />
            ) : (
              <CustomImage source={DefaultProfile} style={styles.image} />
            )}
            <View style={styles.writeWrapper}>
              <CustomImage source={Writing} style={styles.writing} />
            </View>
          </View>
          <View style={styles.textInputWrapper}>
            <MyTextInput
              placeholder="닉네임을 입력하세요"
              style={styles.title}
              onChangeText={nicknameChange}
              value={nickname}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <CustomButton
        title="설정 완료"
        style={styles.button}
        handlePress={handlePress}
        clickable={isValid}
      />
    </KeyboardAvoidingView>
  );
};

export default ModifyNicknameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 76.8,
    alignItems: 'center',
  },
  topContainer: {
    width: 148,
    height: 148,
    alignItems: 'center',
  },
  image: {
    width: 148,
    height: 148,
    borderRadius: 100,
  },
  textInputWrapper: {
    paddingHorizontal: 16,
    width: '100%',
    paddingTop: 78,
  },
  writeWrapper: {
    width: 42,
    height: 42,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderRadius: 100,
    padding: 9,
    ...bottomShadowStyle,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 0,
  },
});
