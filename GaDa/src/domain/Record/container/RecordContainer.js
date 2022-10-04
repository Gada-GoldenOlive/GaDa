import { View, Text } from 'react-native';
import React, { useState } from 'react';
import RecordScreen from '../screen/RecordScreen';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserDetail } from '../../../APIs/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultAxios from '../../../APIs';
import { getBadgeList } from '../../../APIs/badge';
import { getMyWalkList } from '../../../APIs/walkway';
import {getMyReviewList} from '../../../APIs/review';

const RecordContainer = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState('');
  const [myWalks, setMyWalks] = useState([]);
  const [recentWalks, setRecentWalks] = useState([]);
  const fetchData = async () => {
    console.log(defaultAxios.defaults.headers.common.Authorization)
    const res = await getUserDetail();
    if (res.id) {
      setUserData(res);
      setUserId(res.id);
    }
  };

  const getBadge = async () => {
    const res = await getBadgeList(userId);
  };

  const getRecentWalks = async () => {
    const res = await getMyWalkList(0);
    if (res) {
      console.log(res);
      //setMyWalks(walks);
      setRecentWalks(res);
    }
  };

  const getMyWalks = async () => {
    const res = await getMyReviewList(userId);
    if (res) {
      const { feeds } = res;
      setMyWalks(feeds);
    }
  };
  const handleNavigate = ({}) => {
    navigation.navigate('SignIn');
  };

  const handleNaivigateGoal = () => {
    navigation.navigate('GoalSetting');
  };
  const handleNavigateSetting = () => {
    navigation.navigate('SettingPage');
  };
  const handleNavigateBadge = () => {
    navigation.navigate('BadgeList');
  };
  const handleNavigateRecent = () => {
    navigation.navigate('Recent', {recentWalks:recentWalks});
  };
  const handleNavigateMyRecord = () => {
    navigation.navigate('MyRecord');
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userId !== '') {
      //getBadge();
      //getMyWalks()
      getRecentWalks();
    }
  }, [userId]);
  return (
    <RecordScreen
      userData={userData}
      myWalks={myWalks}
      recentWalks={recentWalks}
      handleNavigate={handleNavigate}
      handleNaivigateGoal={handleNaivigateGoal}
      handleNavigateSetting={handleNavigateSetting}
      handleNavigateBadge={handleNavigateBadge}
      handleNavigateRecent={handleNavigateRecent}
      handleNavigateMyRecord={handleNavigateMyRecord}
    />
  );
};

export default RecordContainer;
