import { View } from 'react-native';
import React, { useEffect } from 'react';
import FriendsScreen from '../screen/FriendsScreen';
import { getIdInLocalStorage } from '../../../function';
import { useState } from 'react';
import { getUserFriends } from '../../../APIs/user';

const FriendsContainer = ({ navigation, route }) => {
  const [friendList, setFriendList] = useState([]);
  const [unreadExist, setUnreadExist] = useState(false);

  const fetchData = async () => {
    const res = await getUserFriends();
    if (res) {
      console.log({res});
      const { friends, is_exist_unread_request: unread } = res;
      setFriendList(friends);
      setUnreadExist(unread);
    }
  };
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
  }, []);

  return (
    <FriendsScreen
      friendList={friendList}
      unreadExist={unreadExist}
      handleNavigateAddFriends={handleNavigateAddFriends}
      handleNavigateFriendsAlarm={handleNavigateFriendsAlarm}
      handleNavigate={handleNavigate}
    />
  );
};
export default FriendsContainer;
