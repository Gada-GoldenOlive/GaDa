import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { getUserList } from '../../../APIs/user';

const FriendsContainer = () => {
  const fetchData = async () => {
    const res = await getUserList();
    if (res) {
      console.log(res);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      <Text>FriendsContainer</Text>
    </View>
  );
};

export default FriendsContainer;
