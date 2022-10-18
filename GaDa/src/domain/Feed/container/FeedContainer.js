import { View, Image, Platform } from 'react-native';

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import FeedScreen from '../screen/FeedScreen';
import Geolocation from '@react-native-community/geolocation';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { FeedS } from '../../../constant/images/Sample';
import { getFeeds, getFeedsOrderDistance } from '../../../APIs/review';
import { getNextData } from '../../../APIs';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const FeedContainer = ({ navigation, route }) => {
  const [feedList, setFeedList] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [nextUrl, setNextUrl] = useState('');
  const [order, setOrder] = useState('DISTANCE');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [loading, setLoading] = useState(true);

  const geoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);

        setLatitude(latitude);
        setLongitude(longitude);
        console.log(latitude, longitude)
      },
      error => {
        console.log(error.code, error.message);
      },
      
     { enableHighAccuracy:Platform.OS === 'ios' ? true : false, accurace: {ios : 'best'}, timeout: 20000} 
    );
  };
  const fetchDistanceData = async () => {
    
    setLoading(true);
    const res = await getFeedsOrderDistance(latitude, longitude);
    if (res) {
      const { feeds, links } = res;
      const { next } = links;
      if (next === '') setIsLast(true);
      setNextUrl(next);
      setFeedList(feeds);
      setPage(2);      
    }
    setLoading(false);
  };


  const fetchData = async () => {
    
    setLoading(true);
    const res = await getFeeds(order);
    if (res) {
      const { feeds, links } = res;
      const { next } = links;
      if (next === '') setIsLast(true);
      setNextUrl(next);
      setFeedList(feeds);
      setPage(2);
      setLoading(false);
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
    if(order === 'DISTANCE'){
      geoLocation();
      fetchDistanceData();
    } else {
      fetchData();
    }
    setRefreshing(false);
  });


  useEffect(() => {
    if(order === 'DISTANCE'){
      geoLocation();
    } else {
      fetchData();
    }
   
  }, [order]);

  useEffect(() => {
    if(order === 'DISTANCE'){
      geoLocation();
    } else {
      fetchData();
    }
   
  }, [route.params?.refresh]);

  useEffect(() =>{
    if(latitude !== 0 && longitude !== 0 && order === 'DISTANCE'){
      console.log('hi');
      fetchDistanceData();
    }
  }, [latitude, longitude, order])

  return loading ? <Spinner visible /> : (
    <FeedScreen
      setOrder={setOrder}
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
