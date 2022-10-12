import { View, Text } from 'react-native';
import React from 'react';
import LikeReviewsScreen from '../screen/LikeReviewsScreen';
import { getLikeReviews } from '../../../APIs/review';
import { useState } from 'react';
import { useEffect } from 'react';

const LikeReviewsContainer = ({ navigation, route }) => {
  const [reviewList, setReviewList] = useState([]);
  const fetchData = async () => {
    const res = await getLikeReviews();
    if (res) {
      const { feeds } = res;
      setReviewList(feeds);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <LikeReviewsScreen reviewList={reviewList} />;
};

export default LikeReviewsContainer;
