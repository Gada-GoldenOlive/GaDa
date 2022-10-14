import { View, Image } from 'react-native';

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import FeedScreen from '../screen/FeedScreen';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { FeedS } from '../../../constant/images/Sample';
import { getFeeds } from '../../../APIs/review';

const FeedContainer = ({ navigation, route }) => {
  const [feedList, setFeedList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  

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
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setFeedList([]);
    await fetchData();
    setRefreshing(false);
  });

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <FeedScreen
      feedList={feedList}
      onRefresh={onRefresh}
      refreshing={refreshing}
      handleGettingWalkway={handleGettingWalkway}
      handleDetailFeed={handleDetailFeed}
    />
  );
};

export default FeedContainer;
