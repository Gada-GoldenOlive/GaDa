import React, { useState } from 'react';
import RecordScreen from '../screen/RecordScreen';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../../APIs/user';
import { getBadgeList } from '../../../APIs/badge';
import { getMyWalkList } from '../../../APIs/walkway';
import { getMyReviewList } from '../../../APIs/review';
import { setUser } from '../../../redux/modules/user';

const RecordContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { userId, loginId } = useSelector(state => state.user);
  const [userData, setUserData] = useState({});
  //const [userId, setUserId] = useState('');

  const [myWalks, setMyWalks] = useState([]);
  const [recentWalks, setRecentWalks] = useState([]);
  const [goalInfo, setGoalInfo] = useState({});
  const [badgeList, setBadgeList] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

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
    if (res) {
      const { userBadges } = res;
      setBadgeList(userBadges);
    }
  };

  const getRecentWalks = async () => {
    const res = await getMyWalkList(0);

    /*
    {"walks": [{"createdAt": "2022-10-12T17:55:14.461Z", "distance": 160, "finishStatus": "FINISHED", 
    "id": "36040ddd-b16a-47f0-99b0-9a5368dcba76", "image": "https://picsum.photos/400/250/?image=481", 
    "rate": 9.5, "title": "장한 평역 군자역 산책로"}]}
    */

    if (res) {
      const {walks} = res;
      setRecentWalks(walks);
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
    navigation.navigate('BadgeList', { badgeList });
  };
  const handleNavigateRecent = () => {
    navigation.navigate('Recent', { recentWalks: recentWalks });
  };
  const handleNavigateMyRecord = () => {
    navigation.navigate('MyRecord');
  };

  const handleNavigateLikeReviews = () => {
    navigation.navigate('LikeReviews');
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([getBadge(), getMyWalks(), getRecentWalks()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userId !== '') {
      fetchAllData();
    }
  }, [userId]);

  useEffect(() => {
    if (params.refresh) {
      fetchData();
    }
  }, [params]);
  return (
    <RecordScreen
      loading={false}
      userData={userData}
      myWalks={myWalks}
      badgeList={badgeList}
      recentWalks={recentWalks}
      handleNavigateLikeReviews={handleNavigateLikeReviews}
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
