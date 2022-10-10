import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import SignInBackground from '../../../constant/images/SignIn';
import Text from '../../../components/MyText';
import { boldFontFamily, thinFontFamily } from '../../../constant/fonts';
import MyTextInput from '../../../components/MyTextInput';
import { buttonColor } from '../../../constant/colors';

const SignInScreen = ({
  id,
  pw,
  setId,
  setPw,
  clickable,
  isWrong, 
  handleNavigateSignUp,
  handleNavigate,
}) => {
  return (
    <View style={styles.container}>
      <CustomImage source={SignInBackground} style={styles.background} />
      <View style={styles.liner} />
      <View style={styles.topContainer}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>장애물 없는</Text>
          <Text style={styles.emphasis}>편안한 산책여정</Text>
          <Text style={styles.title}>즐기기</Text>
        </View>
      </View>
      <View style={styles.centerContainer}>
        <MyTextInput
          placeholder="아이디"
          style={[
            styles.textInput,
            id.length >= 1 && { borderBottomColor: buttonColor },
          ]}
          onChangeText={setId}
          value={id}
        />
        <MyTextInput
          placeholder="비밀번호"
          style={[
            styles.textInput,
            pw.length >= 1 && { borderBottomColor: buttonColor },
          ]}
          onChangeText={setPw}
          value={pw}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.bottomContainer}>
        {isWrong && (<Text style={styles.error}>*존재하지 않는 아이디/비밀번호 입니다</Text>)}
        <TouchableWithoutFeedback onPress={handleNavigate}>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>로그인</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleNavigateSignUp}>
          <View style={styles.signupButton}>
            <Text style={styles.signupText}>회원가입</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  background: {
    flex: 1,
    position: 'absolute',
  },
  liner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  topContainer: {
    paddingTop: 122,
    paddingHorizontal: 16,
  },
  titleWrapper: {},
  title: {
    fontFamily: thinFontFamily,
    fontSize: 27,
    lineHeight: 40,
    letterSpacing: -0.54,
    color: 'white',
  },
  emphasis: {
    fontFamily: boldFontFamily,
    fontSize: 27,
    lineHeight: 40,
    letterSpacing: -0.54,
    color: 'white',
  },
  centerContainer: {
    paddingHorizontal: 16,
    // paddingTop: 75.5,
  },
  textInput: {
    borderBottomColor: 'white',
    paddingTop: 44.5,
    color: 'white',
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingTop: 'auto'
  },
  loginButton: {
    width: '100%',
    paddingVertical: 17,
    backgroundColor: buttonColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    color: 'white',
    fontFamily: boldFontFamily,
    fontSize: 18,
  },
  signupButton: {
    width: '100%',
    paddingVertical: 17,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: buttonColor,
    fontFamily: boldFontFamily,
    fontSize: 18,
  },
  error:{
    color: 'white',
    marginBottom: 23,

  }
});
