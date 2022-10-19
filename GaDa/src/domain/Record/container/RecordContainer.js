import React, { useState } from 'react';
import RecordScreen from '../screen/RecordScreen';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../../APIs/user';
import { getBadgeList } from '../../../APIs/badge';
import { getMyWalkList } from '../../../APIs/walkway';
import { getMyReviewList } from '../../../APIs/review';
import { setUser } from '../../../redux/modules/user';
import { getNextData } from '../../../APIs';
import { badgePopup } from '../../../function';
import { setBadges } from '../../../redux/modules/status';
import Spinner from 'react-native-loading-spinner-overlay';

const RecordContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { userId, loginId } = useSelector(state => state.user);
  const { badges } = useSelector(state => state.status);
  const [userData, setUserData] = useState({});
  //const [userId, setUserId] = useState('');

  const [myWalks, setMyWalks] = useState([]);
  const [recentWalks, setRecentWalks] = useState([]);
  const [goalInfo, setGoalInfo] = useState({});
  const [badgeList, setBadgeList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [nextUrl, setNextUrl] = useState('');

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
    const res = await getMyWalkList(1);

    /*
    {"walks": [{"createdAt": "2022-10-12T17:55:14.461Z", "distance": 160, "finishStatus": "FINISHED", 
    "id": "36040ddd-b16a-47f0-99b0-9a5368dcba76", "image": "https://picsum.photos/400/250/?image=481", 
    "rate": 9.5, "title": "장한 평역 군자역 산책로"}]}
    */

    if (res) {
      const { walks } = res;
      setRecentWalks(walks);
    }
  };

  const getMyWalks = async () => {
    const res = await getMyReviewList(userId, page);
    if (res) {
      const { feeds, links } = res;
      const { next } = links;
      if (next === '') setIsLast(true);
      setMyWalks(feeds);
      setPage(2);
      setNextUrl(next);
    }
  };

  const handleLoadMore = async () => {
    if (!isDataLoading) {
      if (isLast) return null;
      setIsDataLoading(true);
      const res = await getMyReviewList(userId, page);
      if (res) {
        const { feeds, links } = res;
        const { next } = links;
        if (next === '') setIsLast(true);
        setNextUrl(next);
        setMyWalks(cur => cur.concat(feeds));
        setPage(page + 1);
      }
      setIsDataLoading(false);
      return null;
    }
    return null;
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
    navigation.navigate('Recent');
  };
  const handleNavigateMyRecord = () => {
    navigation.navigate('MyRecord');
  };

  const handleNavigateLikeReviews = () => {
    navigation.navigate('LikeReviews');
  };

  const handleDetailFeed = id => {
    navigation.navigate('DetailFeed', { id });
  };

  const handleNavigateHome = () => {
    navigation.navigate('BottomTabHome')
  }
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
  return loading ? <Spinner visible /> : (
    <RecordScreen
      userData={userData}
      myWalks={myWalks}
      badgeList={badgeList}
      recentWalks={recentWalks}
      badges={badges}
      handleNavigateLikeReviews={handleNavigateLikeReviews}
      handleNavigate={handleNavigate}
      handleNaivigateGoal={handleNaivigateGoal}
      handleNavigateSetting={handleNavigateSetting}
      handleNavigateBadge={handleNavigateBadge}
      handleNavigateRecent={handleNavigateRecent}
      handleNavigateMyRecord={handleNavigateMyRecord}
      handleDetailFeed={handleDetailFeed}
      handleLoadMore={handleLoadMore}
      handleNavigateHome={handleNavigateHome}
    />
  );
};

export default RecordContainer;
