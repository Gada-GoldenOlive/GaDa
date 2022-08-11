import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  blackColor,
  buttonColor,
  defaultColor,
} from '../../../constant/colors';
import { boldFontFamily } from '../../../constant/fonts';
import CustomImage from '../../../components/CustomImage';
import { Sample } from '../../../constant/images/Temp';

const PinItem = ({ item, index }) => {
  const { id, title, content, image } = item;
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.circle} />
        <View style={styles.textWrapper}>
          <Text style={styles.index}>{index + 1}번째 핀</Text>
          <Text style={styles.text}>: {title}</Text>
        </View>
        <CustomImage source={Sample} style={styles.image} />
      </View>
    </View>
  );
};

export default PinItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 17,
    borderStartColor: buttonColor,
    borderStartWidth: 2,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  textWrapper: {
    flex: 1,
    marginEnd: 4,
    marginStart: 2,
  },
  index: {
    fontFamily: boldFontFamily,
    color: blackColor,
    letterSpacing: -0.28,
  },
  text: {
    letterSpacing: -0.28,
    color: defaultColor,
  },
  image: {
    width: 70,
    height: 70,
  },
});