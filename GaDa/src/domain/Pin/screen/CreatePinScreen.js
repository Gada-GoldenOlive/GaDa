import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomImage from '../../../components/CustomImage';
import Upload from '../../../constant/images/Upload';
import { windowWidth } from '../../../constant/styles';
import { defaultColor } from '../../../constant/colors';
import MyTextInput from '../../../components/MyTextInput';
const CreatePinScreen = () => {
  return (
    <ScrollView style={styles.contianer}>
      <TouchableWithoutFeedback>
        <View style={styles.imageContainer}>
          <CustomImage source={Upload} style={styles.image} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.writingContainer}>
        <MyTextInput placeholder="글 제목" />
        <MyTextInput
          placeholder="해당 구역의 불편한 점을 작성해주세요"
          style={styles.multiLine}
          multiline
        />
      </View>
    </ScrollView>
  );
};

export default CreatePinScreen;

const styles = StyleSheet.create({
  contianer: { flex: 1 },
  imageContainer: {
    width: windowWidth,
    paddingVertical: 75,
    backgroundColor: defaultColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 32,
    height: 32,
  },
  writingContainer: {
    paddingtop: 9.5,
    paddingHorizontal: 16,
  },
  multiLine: {},
});
