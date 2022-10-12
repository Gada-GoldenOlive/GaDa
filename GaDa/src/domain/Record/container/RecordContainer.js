import React, { useState } from 'react';
import RecordScreen from '../screen/RecordScreen';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../../APIs/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultAxios from '../../../APIs';
import { getBadgeList } from '../../../APIs/badge';
import { getMyWalkList } from '../../../APIs/walkway';
import { getMyReviewList } from '../../../APIs/review';
import { setUser } from '../../../redux/modules/user';

const RecordContainer = ({ navigation, route }) => {
  const {params = {}} = route;
  const {userId, loginId } = useSelector(state => state.user);
  const [userData, setUserData] = useState({});
  //const [userId, setUserId] = useState('');

  const [myWalks, setMyWalks] = useState([]);
  const [recentWalks, setRecentWalks] = useState([]);
  const [goalInfo, setGoalInfo] = useState({});
  const [badgeList, setBadgeList] = useState([]);

  const dispatch = useDispatch();
  console.log( {userId, loginId})
  const fetchData = async () => {
    const res = await getUserDetail(userId);
    const { user = {} } = res;
    if (user) {
      setUserData(user);
      setGoalInfo({ goalTime: user.goalTime, goalDistance: user.goalDistance });
      dispatch(
        setUser({
          id: user.id,
          loginId: user.loginId,
          nickname: user.name,
          image: user.image,
        }),
      );
    }
  };

  const getBadge = async () => {
    const res = await getBadgeList();
    console.log(res);
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
    navigation.navigate('GoalSetting', { userId, goalInfo });
  };
  const handleNavigateSetting = () => {
    navigation.navigate('SettingPage');
  };
  const handleNavigateBadge = () => {
    navigation.navigate('BadgeList');
  };
  const handleNavigateRecent = () => {
    navigation.navigate('Recent', { recentWalks: recentWalks });
  };
  const handleNavigateMyRecord = () => {
    navigation.navigate('MyRecord');
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userId !== '') {
      getBadge();
      //getMyWalks()
      getRecentWalks();
    }
  }, [userId]);

  useEffect(() => {
    if (params.refresh) {
      fetchData();
    }
  }, [params]);
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
