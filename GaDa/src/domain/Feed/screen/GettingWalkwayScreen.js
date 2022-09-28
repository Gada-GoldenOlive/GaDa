import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { blackColor } from '../../../constant/colors';
import { boldFontFamily, boldFontSize } from '../../../constant/fonts';
import CustomImage from '../../../components/CustomImage';
import { MapImage } from '../../../constant/images/Temp';
import { Check } from '../../../constant/images/Check';
import { windowWidth } from '../../../constant/styles';
import SubmitButton from '../../../components/SubmitButton';
import CustomButton from '../../../components/CustomButton';
import FeedItemList from '../components/FeedItemList';


const GettingWalkwayScreen = () => {
  return (
    <ScrollView style={styles.container}>
    <View style={styles.topContainer}>
      <Text style={styles.title}>내가 다녀온 산책로</Text>
    </View>
    <FeedItemList type="recent"/>
  </ScrollView>
  );
};

export default GettingWalkwayScreen;

const styles = StyleSheet.create({  
    container: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 28,
    paddingTop: 27.8,
  },
  title: {
    fontFamily: boldFontFamily,
    fontSize: 16,
    color: blackColor,
  },
  writeWrapper: {
    width: 37,
    height: 37,
    padding: 7,
    borderRadius: 100,
    backgroundColor: blackColor,
  },
  middleContainer: {
    paddingTop: 19,
    paddingBottom: 11,
    paddingStart: 16,
  },
});
