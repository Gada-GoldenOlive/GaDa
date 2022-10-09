import { View, Image } from 'react-native';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FeedScreen from '../screen/FeedScreen';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { FeedS } from '../../../constant/images/Sample';
import { getFeeds } from '../../../APIs/review';

const FeedContainer = ({ navigation, route }) => {
  const [feedList, setFeedList] = useState([]);

  const fetchData = async () => {
    const res = await getFeeds();
    const { feeds } = res;
    if (feeds) {
      setFeedList(feeds);
    }
  };
  const handleGettingWalkway = () => {
    navigation.navigate('GettingWalkway');
  };
  const handleDetailFeed = id => {
    navigation.navigate('DetailFeed', { id });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <FeedScreen
      feedList={feedList}
      handleGettingWalkway={handleGettingWalkway}
      handleDetailFeed={handleDetailFeed}
    />
  );
};

export default FeedContainer;
