import { View, Text } from 'react-native';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FeedScreen from '../screen/FeedScreen';
import { useEffect } from 'react';
import { setBottomTabVisible } from '../../../redux/modules/status';

const FeedContainer = () => {
  const [isOverview, setIsOverview] = useState(true);
  const dispatch = useDispatch();
  const handleOverview = value => {
    setIsOverview(value);
  };
  useEffect(() => {
    console.log(isOverview);
    dispatch(setBottomTabVisible(isOverview));
  }, [isOverview]);
  return <FeedScreen isOverview={isOverview} handleOverview={handleOverview} />;
};

export default FeedContainer;
