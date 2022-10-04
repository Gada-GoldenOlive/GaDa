import { View, Text } from 'react-native';
import React, { useState } from 'react';
import RecordScreen from '../screen/RecordScreen';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserDetail } from '../../../APIs/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RecordContainer = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const fetchData = async () => {
    const access_token = await AsyncStorage.getItem('access_token')
    const res = await getUserDetail();
    if(res.id) {
      setUserData(res);
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
    navigation.navigate('Recent');
  };
  const handleNavigateMyRecord = () => {
    navigation.navigate('MyRecord');
  };

  useEffect(() => {
    fetchData()
  },[])
  return (
    <RecordScreen
      userData={userData}
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
