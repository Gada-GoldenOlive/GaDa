import { View } from 'react-native';
import React, { useEffect } from 'react';
import FriendsScreen from '../screen/FriendsScreen';
import { getIdInLocalStorage } from '../../../function';
import { useState } from 'react';

const FriendsContainer = ({ navigation, route }) => {
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

  return (
    <FriendsScreen
      handleNavigateAddFriends={handleNavigateAddFriends}
      handleNavigateFriendsAlarm={handleNavigateFriendsAlarm}
      handleNavigate={handleNavigate}
    />
  );
};
export default FriendsContainer;
