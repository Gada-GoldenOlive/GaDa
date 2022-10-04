import { View, Image } from 'react-native';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FeedScreen from '../screen/FeedScreen';
import { useEffect } from 'react';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { FeedS } from '../../../constant/images/Sample';
import { getFeeds } from '../../../APIs/review';

const FeedContainer = ({navigation, route}) => {
  const fetchData = async () => {
    const res = await getFeeds();
    console.log(res);
  }
  const handleGettingWalkway = () => {
    navigation.navigate('GettingWalkway');
  };
  const handleDetailFeed = id => {
    navigation.navigate('DetailFeed', {id});
  }
  useEffect(() => {
    fetchData();
  }, [])
  return <FeedScreen handleGettingWalkway={handleGettingWalkway} handleDetailFeed={handleDetailFeed} />;
};

export default FeedContainer;
