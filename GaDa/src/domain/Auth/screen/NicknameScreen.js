import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import MyTextInPut from '../../../components/MyTextInput';
import { blackColor, descriptionColor, descriptionColorVer2 } from '../../../constant/colors';
import CustomButton from '../../../components/CustomButton';
import Text from '../../../components/MyText';
import { thinFontFamily } from '../../../constant/fonts';

const NicknameScreen = ({ nickname, handleNavigate, handleNicknameChange }) => {
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
            value={nickname}
            onChangeText={handleNicknameChange}
          />
        </View>
      </View>
      <CustomButton title="다음" handlePress={handleNavigate} backgroundColor={nickname.length <1 && descriptionColor} />
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
});
