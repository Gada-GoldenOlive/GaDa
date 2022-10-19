import { View, Text } from 'react-native';
import React from 'react';
import LikeReviewsScreen from '../screen/LikeReviewsScreen';
import { getLikeReviews } from '../../../APIs/review';
import { useState } from 'react';
import { useEffect } from 'react';
import { getNextData } from '../../../APIs';

const LikeReviewsContainer = ({ navigation, route }) => {
  const [reviewList, setReviewList] = useState([]);
  const [page, setPage] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [nextUrl, setNextUrl] = useState('');

  const fetchData = async () => {
    const res = await getLikeReviews(1);
    if (res) {
      const { feeds, links } = res;
      const { next } = links;
      if (next === '') setIsLast(true);
      setNextUrl(next);
      setReviewList(feeds);
      setPage(2);
    }
  };

  
  const handleLoadMore = async () => {
    if (!isDataLoading) {
      if (isLast) return null;
      setIsDataLoading(true);
      const res = await getLikeReviews(page);
      if (res) {
        const { feeds, links } = res;
        const { next } = links;
        if (next === '') setIsLast(true);
        setNextUrl(next);
        setReviewList(cur => cur.concat(feeds));
        setPage(page + 1);
      }
      setIsDataLoading(false);
      return null;
    }
    return null;
  };


  const handleDetailFeed = id => {
    navigation.navigate('DetailFeed', { id });
  };


  

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <LikeReviewsScreen
      reviewList={reviewList}
      handleLoadMore={handleLoadMore}
      handleDetailFeed={handleDetailFeed}
    />
  );
};

export default LikeReviewsContainer;
