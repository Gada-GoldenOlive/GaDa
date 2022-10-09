import { View } from 'react-native';
import React, { useEffect } from 'react';
import FriendsScreen from '../screen/FriendsScreen';
import { getIdInLocalStorage } from '../../../function';
import { useState } from 'react';
import { getUserFriends } from '../../../APIs/user';

const FriendsContainer = ({ navigation, route }) => {
  const fetchData = async () => {
    const res = await getUserFriends();
    console.log(res);
  }
  const handleNavigateAddFriends = () => {
    navigation.navigate('addFriends');
  };
  const handleNavigateFriendsAlarm = () => {
    navigation.navigate('friendsAlarm');
  };
  const handleNavigate = (id, idx) => {
    console.log(idx);
    navigation.navigate('FriendRecord', { id, rank: idx + 1 });
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <FriendsScreen
      handleNavigateAddFriends={handleNavigateAddFriends}
      handleNavigateFriendsAlarm={handleNavigateFriendsAlarm}
      handleNavigate={handleNavigate}
    />
  );
};
export default FriendsContainer;
