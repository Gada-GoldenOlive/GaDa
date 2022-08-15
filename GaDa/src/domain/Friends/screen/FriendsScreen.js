import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { windowWidth } from '../../../constant/styles';
import CustomImage from '../../../components/CustomImage';
import { RankingS } from '../../../constant/images/Sample';

const FriendsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <CustomImage source={RankingS} style={styles.image} />
    </ScrollView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -50,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: windowWidth,
    height: (windowWidth * 844) / 390,
  },
});
