import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CenterModal from '../../../components/CenterModal';
import WalkEnd from '../../../components/WalkEnd';
import CustomImage from '../../../components/CustomImage';
import { MapImage, Sample } from '../../../constant/images/Temp';
import { windowHeight, windowWidth } from '../../../constant/styles';
import CustomButton from '../../../components/CustomButton';
import { MyS } from '../../../constant/images/Sample';

const RecordScreen = ({ handleNavigate }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableWithoutFeedback onPress={handleNavigate}>
        <CustomImage source={MyS} style={styles.image} />
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -50,
  },
  image: {
    width: windowWidth,
    height: (windowWidth * 2606) / 780,
  },
});
