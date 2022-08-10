import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PinInformation from '../../Home/components/PinInformation';
import WalkwayOverview from '../../Home/components/WalkwayOverview';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BottomUpModal from '../../../components/BottomUpModal';

const FeedScreen = ({ isOverview, handleOverview }) => {
  const tempWalkway = {
    id: 'a',
    title: '성동구 왕십리로 산책길',
    address: '서울특별시 어쩌구',
    distance: 0,
    time: 0,
    path: {},
    creator: '성동구 불주먹',
    pinNum: 3,
  };
  return (
    <View style={styles.container}>
      {isOverview ? (
        <WalkwayOverview
          walkWay={tempWalkway}
          isVisible={isOverview}
          closeModal={() => handleOverview(false)}
        />
      ) : (
        <PinInformation
          walkWay={tempWalkway}
          closeModal={() => handleOverview(true)}
          isVisible={!isOverview}
        />
      )}
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
