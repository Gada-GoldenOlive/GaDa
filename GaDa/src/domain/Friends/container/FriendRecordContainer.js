import { StyleSheet } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { SampleImage3 } from '../../../constant/images/Sample';
import FriendRecordScreen from '../screen/FriendRecordScreen';
import { useEffect } from 'react';
import { getUserDetail, getUserList, modifyFriend } from '../../../APIs/user';
import { getMyReviewList } from '../../../APIs/review';

// const res = {
//   name: '상암동 정호연',
//   image: SampleImage3,
//   totalTime: 7,
//   totalDistance: 10090,
//   id: 4940,
// };

const FriendRecordContainer = ({ navigation, route }) => {
  const { params } = route;
  const { id, rank, friendId } = params;
  console.log(id);

  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState('');

  const [myWalks, setMyWalks] = useState([]);
  const [recentWalks, setRecentWalks] = useState([]);
  const [goalInfo, setGoalInfo] = useState({});

  const [page, setPage] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [nextUrl, setNextUrl] = useState('');



  const openPopup = () => {
    setIsPopupVisible(true);
  };
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const fetchRecordData = async () => {
    setLoading(true);
    const res = await getUserDetail(id);
    const { user } = res;
    console.log(user);
    if (user) {
      setUserData(user);
      setUserId(user.id);
      setGoalInfo({ goalTime: user.goalTime, goalDistance: user.goalDistance });
    }
    setLoading(false);

    setLoading(true);
    console.log(userId)
    const res_walk = await getMyReviewList(userId, 1);
    if (res_walk) {
      const { feeds, links } = res_walk;
      const {next} = links;
      if(next === '') setIsLast(true);
      console.log(feeds);
      setMyWalks(feeds.filter(x => x.userId === id));
      setPage(2);
      setNextUrl(next);
    }
    setLoading(false);
  };

  const handleLoadMore = async () => {
    if (!isDataLoading) {
      if (isLast) return null;
      setIsDataLoading(true);
      const res = await getNextData(nextUrl);
      if (res) {
        const { feeds, links } = res;
        const { next } = links;
        if (next === '') setIsLast(true);
        setNextUrl(next);
        setMyWalks(cur => cur.concat(feeds.filter(x => x.userId === id)));
        setPage(page + 1);
      }
      setIsDataLoading(false);
      return null;
    }
    return null;
  };
  const handleDetailFeed = id => {
    navigation.navigate('DetailFeed', { id });
  };




  const handleDeleteButton = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const handleViewMoreButton = () => {
    console.log('viewMore');
    navigation.navigate('MyRecord');
  };
  handleConfirmButton = async () => {
    console.log(friendId, 'delete');

    await modifyFriend(friendId, 'DELETE');
    closePopup();
    navigation.navigate('Friends', { refresh: {} });
  };

  useEffect(() => {
    if (dataList.length > 0) {
      console.log('언제?');
    }
  }, [dataList]);

  useEffect(() => {
    fetchRecordData();
  }, []);

  return (
    !loading && (
      <FriendRecordScreen
        dataList={dataList}
        rank={rank}
        handleDeleteButton={handleDeleteButton}
        handleViewMoreButton={handleViewMoreButton}
        isPopupVisible={isPopupVisible}
        openPopup={openPopup}
        closePopup={closePopup}
        handleConfirmButton={handleConfirmButton}
        userData={userData}
        userId={userId}
        myWalks={myWalks}
        goalInfo={goalInfo}
        handleLoadMore={handleLoadMore}
        handleDetailFeed={handleDetailFeed}
      />
    )
  );
};

export default FriendRecordContainer;

const styles = StyleSheet.create({});
