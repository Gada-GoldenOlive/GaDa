import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import BottomUpModal from '../../../components/BottomUpModal';
import WalkEnd from '../../../components/WalkEnd';
import CustomImage from '../../../components/CustomImage';
import { MapImage } from '../../../constant/images/Temp';
import { windowHeight, windowWidth } from '../../../constant/styles';
import CustomButton from '../../../components/CustomButton';

const RecordScreen = ({
  isVisible,
  setIsVisible,
  setWalkEnd,
  handleConfirm,
  walkEnd,
}) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(true)}>
        <CustomImage
          source={MapImage}
          style={styles.map}
          resizeMode="contain"
        />
      </TouchableWithoutFeedback>
      <BottomUpModal
        isVisible={isVisible}
        closeModal={() => setIsVisible(false)}
        handleConfirm={handleConfirm}
      />
      {<WalkEnd isVisible={walkEnd} onPress={() => setWalkEnd(false)} />}
    </View>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: windowWidth,
    height: windowHeight,
    // backgroundColor: 'red',
  },
});
