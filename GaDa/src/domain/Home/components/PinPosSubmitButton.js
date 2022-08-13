import { StyleSheet, View } from 'react-native';
import React from 'react';
import { backgroundColor } from '../../../constant/colors';
import { bottomShadowStyle, topShadowStyle } from '../../../constant/styles';
import Text from '../../../components/MyText';
import { mediumFontFamily } from '../../../constant/fonts';

const PinPosSubmitButton = () => {
  return (
    <View style={styles.buttonWrapper}>
      <Text style={styles.buttonText}>확인</Text>
    </View>
  );
};

export default PinPosSubmitButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    top: 61,
    right: 16,
    //zIndex: 100,

    paddingVertical: 7,
    paddingHorizontal: 23,
    borderRadius: 17,

    backgroundColor: '#49d492',

    ...bottomShadowStyle,
    ...topShadowStyle,

    shadowOpacity: 1,
  },
  buttonText: {
    fontFamily: mediumFontFamily,
    fontSize: 16,
    color: 'white',
  },
});
