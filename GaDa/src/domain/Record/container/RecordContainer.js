import { View, Text } from 'react-native';
import React, { useState } from 'react';
import RecordScreen from '../screen/RecordScreen';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const RecordContainer = ({ navigation }) => {
  const handleNavigate = ({}) => {
    navigation.navigate('SignIn');
  };
  const handleNaigateNickname = () => {
    navigation.navigate('ModifyNickname')
  }
  return <RecordScreen handleNavigate={handleNavigate} handleNaigateNickname={handleNaigateNickname} />;
};

export default RecordContainer;
