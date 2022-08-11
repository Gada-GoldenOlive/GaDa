import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import Animated from 'react-native-reanimated';
import Text from '../../../components/MyText';
import WalkwayListComponent from '../../Home/components/WalkwayListComponent';
import { windowWidth } from '../../../constant/styles';
import {
  activeDotColor,
  borderColor,
  descriptionColor,
  dotColor,
} from '../../../constant/colors';
const FriendsScreen = () => {
  const tempWalkwaylist = [
    {
      id: 'a',
      title: '성동구 왕십리로 산책길',
      address: '성동구 왕십리로 산책길',
      distance: 0,
      time: 0,
      pinCount: 2,
      path: {},
      creator: 'string',
      creatorId: 'string',
    },
    {
      id: 'a',
      title: '성동구 왕십리로 산책길',
      address: '성동구 왕십리로 산책길',
      distance: 0,
      time: 0,
      pinCount: 2,
      path: {},
      creator: 'string',
      creatorId: 'string',
    },
  ];
  return (
    <View style={styles.container}>
      <WalkwayListComponent list={tempWalkwaylist} />
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperContainer: {
    width: windowWidth,
    height: 100,
  },
  progressContainer: {
    marginHorizontal: 16,
  },
  progressWrapper: {
    width: '100%',
    backgroundColor: borderColor,
    position: 'absolute',
    bottom: 17,
    height: 1,
    zIndex: 999,
  },
  indicator: {
    height: 1.5,
    backgroundColor: 'red',
  },
  dot: {
    width: 7,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 5,
    backgroundColor: dotColor,
  },
  activeDot: {
    width: 38,
    height: 4,
    backgroundColor: activeDotColor,
  },
});
