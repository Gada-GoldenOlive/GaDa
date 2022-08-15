import { View, Text } from 'react-native';
import React, { useState } from 'react';
import RecordScreen from '../screen/RecordScreen';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const RecordContainer = () => {
  return <RecordScreen />;
};

export default RecordContainer;
