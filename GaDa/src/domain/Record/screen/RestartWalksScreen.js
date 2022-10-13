import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  finishedBackground,
  unfinishedBackground,
} from '../../../constant/images/BackgroundImage';
import Text from '../../../components/MyText';
import CustomImage from '../../../components/CustomImage';
import WalkEnd from '../../../components/WalkEnd';
import LinearGradient from 'react-native-linear-gradient';
import { getDistance } from '../../../function';

const RestartWalksScreen = ({ walkRate, walkInfo }) => {
  const backgroundImage =
    walkRate > 50 ? finishedBackground : unfinishedBackground;
  const {
    createdAt,
    distance,
    finishStatus,
    id,
    image,
    pinCount,
    time,
    title,
    walkwayId,
  } = walkInfo;
  console.log(walkInfo);

  return (
    <View style={styles.container}>
      <CustomImage source={backgroundImage} />
      <WalkEnd
        isVisible={true}
        walkData={walkInfo}
        pinNum={pinCount}
        title={title}
        buttonText="다시시작"
      />
    </View>
  );
};

export default RestartWalksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
