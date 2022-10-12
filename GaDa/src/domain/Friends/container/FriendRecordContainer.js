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

  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState('');

  const [myWalks, setMyWalks] = useState([]);
  const [recentWalks, setRecentWalks] = useState([]);
  const [goalInfo, setGoalInfo] = useState({});

  const openPopup = () => {
    setIsPopupVisible(true);
  };
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const fetchRecordData = async () => {
    setLoading(true);
    const res = await getUserDetail(id);
    console.log(res);
    const { user } = res;
    if (user) {
      setUserData(user);
      setUserId(user.id);
      setGoalInfo({ goalTime: user.goalTime, goalDistance: user.goalDistance });
    }
    setLoading(false);

    setLoading(true);
    const res_walk = await getMyReviewList(id);
    if (res_walk) {
      const { feeds } = res_walk;
      setMyWalks(feeds);
    }
    setLoading(false);
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
    console.log(userId);
    await modifyFriend(friendId, 'DELETE');

    console.log('confirm');
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
      />
    )
  );
};

export default FriendRecordContainer;

const styles = StyleSheet.create({});
