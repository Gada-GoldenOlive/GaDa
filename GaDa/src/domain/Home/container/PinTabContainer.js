import React from 'react';
import PinTabScreen from '../screen/PinTabScreen';
import { useEffect } from 'react';
import { getWalkwayPinList } from '../../../APIs/pin';
import { getWalkwayReviewList } from '../../../APIs/review';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
const PinTabContainer = ({ walkWay, avg }) => {
  const [pinList, setPinList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [average, setAverage] = useState(avg);

  const [page, setPage] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [nextUrl, setNextUrl] = useState('');
  const navigation = useNavigation();
  
  const id = walkWay?.id ? walkWay.id : 0;
  const fetchData = async () => {
    const pin = await getWalkwayPinList(id);
    const review = await getWalkwayReviewList(id);
    if (pin) {
      const { pins } = pin;
      setPinList(pins);
    }
    if (review) {
      const { averageStar, reviews, links } = review;
      const { next } = links;
      if (next === '') setIsLast(true);
      setNextUrl(next);
      setReviewList(reviews);
      setAverage(averageStar);
      setPage(2);
    }
  };
  const handleLoadMore = async () => {
    if (!isDataLoading) {
      if (isLast) return null;
      setIsDataLoading(true);
      const res = await getNextData(nextUrl);
      if (res) {
        const { reviews, links } = res;
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

  const handleNavigateReview = id => {
    navigation.navigate('DetailFeed', {id})
  }

  useEffect(() => {
    if (id !== 0) {
      fetchData();
    }
  }, [id]);
  return (
    <PinTabScreen
      pinList={pinList}
      reviewList={reviewList}
      average={average}
      handleLoadMore={handleLoadMore}
      handleNavigateReview={handleNavigateReview}
    />
  );
};

export default PinTabContainer;
