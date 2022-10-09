import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FriendsAlarmScreen from '../screen/FriendsAlarmScreen';
import { useState } from 'react';
import {
  SampleImage1,
  SampleImage2,
  SampleImage3,
} from '../../../constant/images/Sample';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { getAlarmList } from '../../../APIs/user';

const res = [
  {
    name: '만두전골',
    image: SampleImage2,
    id: 12293,
  },
  {
    name: '상암동 정호연',
    image: SampleImage3,
    id: 10090,
  },
  {
    name: '산책왕 차돌',
    image: SampleImage3,
    id: 9252,
  },

  {
    name: '산책왕 뽀삐',
    image: SampleImage1,
    id: 5350,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 4940,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 3593,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 12,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 13,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 14,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 15,
  },
];

const FriendsAlarmContainer = () => {
  const [alarmList, setAlarmList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAlarmList = async () => {
    const res = await getAlarmList();
    if(res){
      const {requests} = res;
      setAlarmList(requests);
    }
  };

  const handleAcceptButton = id => {
    console.log('accept', id);
  };
  const handleRefuseButton = id => {
    console.log('refuse', id);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAlarmList()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchAlarmList();
  }, []);

  return (
    <FriendsAlarmScreen
      alarmList={alarmList}
      handleAcceptButton={handleAcceptButton}
      handleRefuseButton={handleRefuseButton}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

export default FriendsAlarmContainer;

const styles = StyleSheet.create({});
