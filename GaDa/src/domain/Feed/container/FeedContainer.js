import { View, Image } from 'react-native';

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import FeedScreen from '../screen/FeedScreen';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { FeedS } from '../../../constant/images/Sample';
import { getFeeds } from '../../../APIs/review';
import { getNextData } from '../../../APIs';

const FeedContainer = ({ navigation, route }) => {
  const [feedList, setFeedList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [nextUrl, setNextUrl] = useState('');
  const [order, setOrder] = useState('LATEST');

  const fetchData = async () => {
    const res = await getFeeds(order, 0, 0, 1);
    if (res) {
      const { feeds, links } = res;
      const { next } = links;
      if (next === '') setIsLast(true);
      setNextUrl(next);
      setFeedList(feeds);
      setPage(2);
    }
  };

  const handleLoadMore = async () => {
    if (!isDataLoading) {
      if (isLast) return null;
      setIsDataLoading(true);
      const res = await getNextData(nextUrl);
      if (res) {
        const { feeds, links } = res;
        const { next } = links;
        if (next === '') setIsLast(true);
        setNextUrl(next);
        setFeedList(cur => cur.concat(feeds));
        setPage(page + 1);
      }
      setIsDataLoading(false);
      return null;
    }
    return null;
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
      handleLoadMore={handleLoadMore}
    />
  );
};

export default FeedContainer;
