import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AddFriendsScreen from '../screen/AddFriendsScreen';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  SampleImage1,
  SampleImage2,
  SampleImage3,
} from '../../../constant/images/Sample';

const friendsList = [
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

const AddFriendsContainer = () => {
  const [searchList, setSearchList] = useState();
  const fetchSearchResults = () => {
    setSearchList(friendsList);
  };
  useEffect(() => {
    fetchSearchResults();
  }, []);

  return <AddFriendsScreen searchList={searchList} />;
};

export default AddFriendsContainer;

const styles = StyleSheet.create({});
