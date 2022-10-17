import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';

import CustomImage from '../../../components/CustomImage';

import { mainColor } from '../../../constant/colors';
import Add from '../../../constant/images/Add';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { setIsCreate } from '../../../redux/modules/status';

const CreateWalkwayButton = ({ openStartModal }) => {
  const dispatch = useDispatch();
  const handleCreateWalkway = () => {
    dispatch(setIsCreate(true));
    openStartModal();
  };
  return (
    <View style={styles.createWalkwayButtonContainer}>
      <TouchableWithoutFeedback onPress={handleCreateWalkway}>
        <View style={styles.createWalkwayButtonWrapper}>
          <Text style={styles.createWalkwayButtonText}>산책로 제작</Text>
          <CustomImage source={Add} style={styles.addIcon} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CreateWalkwayButton;

const styles = StyleSheet.create({
  createWalkwayButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 16,
  },
  createWalkwayButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',

    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: mainColor,
    backgroundColor: 'white',
  },
  createWalkwayButtonText: {
    letterSpacing: -0.28,
    color: '#3f7a58',
  },
  addIcon: {
    marginLeft: 4,
    width: 16,
    height: 16,
  },
});
