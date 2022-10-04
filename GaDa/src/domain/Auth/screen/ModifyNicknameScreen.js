import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { DefaultProfile } from '../../../constant/images/Sample';
import Writing from '../../../constant/images/Writing';
import { bottomShadowStyle } from '../../../constant/styles';
import MyTextInput from '../../../components/MyTextInput';
import CustomButton from '../../../components/CustomButton';
import { getNicknameIsValid } from '../../../function';
const ModifyNicknameScreen = ({ nicknameChange, nickname, nicknameCheck, isValid }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <CustomImage source={DefaultProfile} style={styles.image} />
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
      <CustomButton
        title="설정 완료"
        style={styles.button}
        handlePress={nicknameCheck}
        clickable={isValid}
      />
    </View>
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
    alignItems:'center',
    justifyContent: 'center'
  },
  button:{
    position: 'absolute',
    bottom: 0,
  }
});
