import { View } from 'react-native';
import React, { useEffect } from 'react';
import FriendsScreen from '../screen/FriendsScreen';

import { getUserList } from '../../../APIs/user';

const FriendsContainer = () => {
  const fetchData = async () => {
    const res = await getUserList();
    console.log(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <FriendsScreen />;
};

export default FriendsContainer;
