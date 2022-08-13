import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { bottomShadowStyle, windowWidth } from '../../../constant/styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { buttonColor } from '../../../constant/colors';
import { boldFontFamily } from '../../../constant/fonts';

const StartButton = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <View style={styles.wrapper}>
          <Text style={styles.text}>경로 시작</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default StartButton;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    paddingBottom: 33,
    backgroundColor: 'white',
    paddingTop: 14.5,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    ...bottomShadowStyle,
  },
  wrapper: {
    backgroundColor: buttonColor,
    borderRadius: 8,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: boldFontFamily,
    fontSize: 18,
    letterSpacing: -0.36,
    color: 'white',
  },
});
