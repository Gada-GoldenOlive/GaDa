import { View, Text } from 'react-native';
import React from 'react';
import DetailFeedScreen from '../screen/DetailFeedScreen';
import { getDetailFeed } from '../../../APIs/review';
import { useEffect } from 'react';
import { useState } from 'react';

const DetailFeedContainer = ({ navigation, route }) => {

  const { params = {} } = route;
  const { id } = params;
  const [feedInfo, setFeedInfo] = useState({});

  const fetchData = async () => {
    const res = await getDetailFeed(id);
    if (res) {
      const { feed } = res;
      setFeedInfo(feed);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <DetailFeedScreen feedInfo={feedInfo}/>;
};

export default DetailFeedContainer;
