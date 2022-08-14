import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
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
import RefreshButton from '../../../components/RefreshButton';
import PinListModal from '../../../components/PinListModal';
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
      id: 'b',
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
      id: 'c',
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
      id: 'd',
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

  const [isVisible, setIsVisible] = useState(true);
  const closeModal = () => {
    setIsVisible(false);
  };
  return (
    <View style={styles.container}>
      {/* <WalkwayListComponent list={tempWalkwaylist} /> */}
      <RefreshButton />
      <PinListModal isVisible={isVisible} closeModal={closeModal} />
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
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
