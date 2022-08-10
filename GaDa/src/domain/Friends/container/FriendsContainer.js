import { View } from 'react-native';
import React, { useEffect } from 'react';
import Text from '../../../components/MyText';

import { getUserList } from '../../../APIs/user';

const FriendsContainer = () => {
  const fetchData = async () => {
    const res = await getUserList();
    console.log(res);
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
