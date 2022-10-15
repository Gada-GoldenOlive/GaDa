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
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { setIsRestart, setRestartWalkway } from '../../../redux/modules/status';

const RestartWalksScreen = ({ walkRate, walkInfo }) => {
  // console.log(walkInfo);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const onPress = () => {
    dispatch(setIsRestart(true));
    dispatch(setRestartWalkway(walkInfo));
    navigation.navigate('BottomTabHome');
  };
  return (
    <View style={styles.container}>
      <CustomImage source={backgroundImage} />
      <WalkEnd
        isVisible={true}
        walkData={walkInfo}
        pinNum={pinCount}
        title={title}
        buttonText="다시시작"
        onPress={onPress}
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
