import { StyleSheet, View } from 'react-native';
import React from 'react';
import { bottomShadowStyle } from '../constant/styles';
import CustomImage from './CustomImage';
import RefreshIcon from '../constant/images/Refresh';
import { blackColor } from '../constant/colors';
import Text from './MyText';
const RefreshButton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CustomImage source={RefreshIcon} style={styles.image} />
        <Text style={styles.text}>현 지도에서 검색</Text>
      </View>
    </View>
  );
};

export default RefreshButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingStart: 12,
    paddingEnd: 13,
    backgroundColor: 'white',
    ...bottomShadowStyle,
    alignSelf: 'center',
    borderRadius: 17,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  text: {
    color: blackColor,
  },
});
