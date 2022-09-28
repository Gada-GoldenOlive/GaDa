import { View, Image } from 'react-native';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FeedScreen from '../screen/FeedScreen';
import { useEffect } from 'react';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { FeedS } from '../../../constant/images/Sample';

const FeedContainer = ({navigation, route}) => {
  const handleGettingWalkway = () => {
    navigation.navigate('GettingWalkway');
  }
  return <FeedScreen handleGettingWalkway={handleGettingWalkway}/>;
};

export default FeedContainer;
