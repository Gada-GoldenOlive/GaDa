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

  const handleNaivigateGoal = () => {
    navigation.navigate('GoalSetting');
  };
  const handleNavigateSetting = () => {
    navigation.navigate('SettingPage');
  };
  const handleNavigateBadge = () => {
    navigation.navigate('BadgeList')
  }
  return (
    <RecordScreen
      handleNavigate={handleNavigate}
      handleNaivigateGoal={handleNaivigateGoal}
      handleNavigateSetting={handleNavigateSetting}
      handleNavigateBadge={handleNavigateBadge}
    />
  );
};

export default RecordContainer;
