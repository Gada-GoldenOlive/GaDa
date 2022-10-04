import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import MyTextInPut from '../../../components/MyTextInput';
import {
  blackColor,
  buttonColor,
  descriptionColor,
  descriptionColorVer2,
} from '../../../constant/colors';
import CustomButton from '../../../components/CustomButton';
import Text from '../../../components/MyText';
import { thinFontFamily } from '../../../constant/fonts';

const IDScreen = ({
  isWrong,
  userId,
  checkId,
  first,
  changed,
  handleNavigate,
  handleIdChange,
}) => {
  const back = !isWrong ? buttonColor : descriptionColor;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>아이디를 입력하세요</Text>
      <View style={styles.contentContainer}>
        <View style={styles.contentWrapper}>
          <MyTextInPut
            style={styles.textInput}
            placeholder="아이디를 입력하세요"
            value={userId}
            onChangeText={handleIdChange}
          />
          <TouchableWithoutFeedback onPress={checkId}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText}>중복확인</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {isWrong && !first && !changed && (
          <Text style={styles.errorText}>*중복된 아이디입니다</Text>
        )}
      </View>
      <CustomButton
        title="다음"
        handlePress={handleNavigate}
        backgroundColor={back}
      />
    </View>
  );
};

export default IDScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 27,
    lineHeight: 40,
    color: blackColor,
    fontFamily: thinFontFamily,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 130,
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
