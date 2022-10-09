import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import MyTextInPut from '../../../components/MyTextInput';
import { blackColor, descriptionColor, descriptionColorVer2 } from '../../../constant/colors';
import CustomButton from '../../../components/CustomButton';
import Text from '../../../components/MyText';
import { thinFontFamily } from '../../../constant/fonts';
const PWScreen = ({ isValid, password, handlePwChange, handleNavigate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>비밀번호를 입력하세요</Text>
        <Text style={styles.description}>*영어 대/소문자, 숫자, 특수문자 조합 6글자 이상</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentWrapper}>
          <MyTextInPut
            style={styles.textInput}
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChangeText={handlePwChange}
            secureTextEntry={true}
          />
        </View>
      </View>
      <CustomButton title="다음" handlePress={handleNavigate} clickable={isValid}/>
    </View>
  );
};

export default PWScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 27,
    lineHeight: 40,
    paddingHorizontal: 16,
    color: blackColor,
    fontFamily: thinFontFamily,
  },
  description:{
    paddingHorizontal: 16,
    color: descriptionColorVer2

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
});
