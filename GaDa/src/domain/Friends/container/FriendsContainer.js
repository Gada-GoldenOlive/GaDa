import { View } from 'react-native';
import React, { useEffect } from 'react';
import FriendsScreen from '../screen/FriendsScreen';
import { getIdInLocalStorage } from '../../../function';
import { useState } from 'react';
import { getUserFriends } from '../../../APIs/user';
import { useDispatch, useSelector } from 'react-redux';
import { setBadges } from '../../../redux/modules/status';
import Spinner from 'react-native-loading-spinner-overlay';
import { useCallback } from 'react';

const FriendsContainer = ({ navigation, route }) => {
  const [friendList, setFriendList] = useState([]);
  const [unreadExist, setUnreadExist] = useState(false);
  const { badges } = useSelector(state => state.status);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    const res = await getUserFriends();
    if (res) {
      const { friends, is_exist_unread_request: unread, achieves = [] } = res;
      console.log(res);
      if (achieves.length > 0) {
        dispatch(setBadges(achieves));
      }
      setFriendList(friends);
      setUnreadExist(unread);
    }
    setLoading(false);
  };

  const handleNavigateAddFriends = () => {
    navigation.navigate('addFriends');
  };
  const handleNavigateFriendsAlarm = () => {
    navigation.navigate('friendsAlarm');
  };
  const handleNavigate = (id, idx, friendId) => {
    navigation.navigate('FriendRecord', { id, rank: idx + 1, friendId });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [route.params?.refresh]);

  return loading ? (
    <Spinner visible />
  ) : (
    <FriendsScreen
      badges={badges}
      friendList={friendList}
      unreadExist={unreadExist}
      handleNavigateAddFriends={handleNavigateAddFriends}
      handleNavigateFriendsAlarm={handleNavigateFriendsAlarm}
      handleNavigate={handleNavigate}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};
export default FriendsContainer;
