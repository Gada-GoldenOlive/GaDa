import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import RestartWalksScreen from '../screen/RestartWalksScreen';
import { getDetailWalk } from '../../../APIs/walk';

const RestartWalksContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { item } = params;
  const [defaultInfo, setDefaultInfo] = useState(item);
  // createdAt, distance, finished, image, rate, title
  const [walkRate, setWalkRate] = useState(0);
  const [walkInfo, setWalkInfo] = useState({});
  const fetchData = async () => {
    const res = await getDetailWalk(defaultInfo.id);
    if (res) {
      const { walk } = res;
      // createdAt, distance, finishStatus, id, image, pinCount, time, title, walkwayId
      setWalkInfo(walk);
    }
  };

  useEffect(() => {
    const { rate } = defaultInfo;
    setWalkRate(rate);
  }, [defaultInfo]);

  useEffect(() => {
    if (defaultInfo?.id) {
      fetchData();
    }
  }, [defaultInfo]);
  return <RestartWalksScreen walkRate={walkRate} walkInfo={walkInfo} />;
};

export default RestartWalksContainer;
