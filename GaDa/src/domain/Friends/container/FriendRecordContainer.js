import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { SampleImage3 } from '../../../constant/images/Sample';
import FriendRecordScreen from '../screen/FriendRecordScreen';
import { useEffect } from 'react';

const res = {
  name: '상암동 정호연',
  image: SampleImage3,
  totalTime: 7,
  totalDistance: 10090,
  id: 4940,
};

const FriendRecordContainer = ({ route }) => {
  const { params } = route;
  const { id, rank } = params;

  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);

  const fetchRecordData = async () => {
    setLoading(true);
    // const res = await
    setDataList(res);
    setLoading(false);
  };

  useEffect(() => {
    if (dataList.length > 0) {
      console.log('언제?');
    }
  }, [dataList]);

  useEffect(() => {
    fetchRecordData();
  }, []);

  return !loading && <FriendRecordScreen dataList={dataList} rank={rank} />;
};

export default FriendRecordContainer;

const styles = StyleSheet.create({});
