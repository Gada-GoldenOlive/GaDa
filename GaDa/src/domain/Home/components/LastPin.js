import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { blackColor, buttonColor } from '../../../constant/colors';
import { boldFontFamily } from '../../../constant/fonts';

const LastPin = ({ isVisible = true }) => {
  return (
    isVisible && (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.circle} />
          <Text style={styles.text}>도착</Text>
        </View>
      </View>
    )
  );
};

export default LastPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    borderStartColor: buttonColor,
    borderStartWidth: 2,
  },
  wrapper: {
    flexDirection: 'row',
  },
  circle: {
    marginStart: -9,
    width: 16,
    height: 18,
    backgroundColor: 'white',
    borderColor: buttonColor,
    borderWidth: 2,
    borderRadius: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    marginEnd: 10,
  },
  text: {
    fontFamily: boldFontFamily,
    color: blackColor,
    letterSpacing: -0.28,
  },
});