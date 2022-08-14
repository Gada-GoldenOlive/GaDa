import { View, Text } from 'react-native';
import React from 'react';
import PinTabScreen from '../screen/PinTabScreen';
import { useEffect } from 'react';
import { getWalkwayPinList } from '../../../APIs/pin';
import { getWalkwayReviewList } from '../../../APIs/review';
import { useState } from 'react';
const PinTabContainer = ({ walkWay, avg }) => {
  const [pinList, setPinList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [average, setAverage] = useState(avg);
  console.log(walkWay);
  const id = walkWay?.id ? walkWay.id : 0;
  const fetchData = async () => {
    const pin = await getWalkwayPinList(id);
    const review = await getWalkwayReviewList(id);
    if (pin) {
      const { pins } = pin;
      setPinList(pins);
    }
    if (review) {
      const { averageStar, reviews } = review;
      setReviewList(reviews);
      setAverage(averageStar);
    }
  };
  useEffect(() => {
    if (id !== 0) {
      fetchData();
    }
  }, [id]);
  return (
    <PinTabScreen pinList={pinList} reviewList={reviewList} average={average} />
  );
};

export default PinTabContainer;
