import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import PinInformation from '../../Home/components/PinInformation';
import WalkwayOverview from '../../Home/components/WalkwayOverview';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import WalkEnd from '../../../components/WalkEnd';
import CustomImage from '../../../components/CustomImage';
import { FeedS, MyS } from '../../../constant/images/Sample';
import { windowHeight, windowWidth } from '../../../constant/styles';

const FeedScreen = ({}) => {
  return (
    <ScrollView style={styles.container}>
      <CustomImage source={FeedS} style={styles.image} />
    </ScrollView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: -50,
    flex: 1,
  },
  image: {
    width: windowWidth,
    height: (windowWidth * 955) / 390,
  },
});
