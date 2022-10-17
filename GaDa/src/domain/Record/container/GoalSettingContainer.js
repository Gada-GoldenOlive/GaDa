import React from 'react';
import GoalSettingScreen from '../screen/GoalSettingScreen';
import { useState } from 'react';
import { updateUserInfo } from '../../../APIs/user';
import { setBadges } from '../../../redux/modules/status';
import { useDispatch } from 'react-redux';

const GoalSettingContainer = ({ route, navigation }) => {
  const { params = {} } = route;
  const { goalInfo = {}, userId } = params;
  const { goalTime, goalDistance } = goalInfo;
  const [time, setTime] = useState(goalTime);
  const [distance, setDistance] = useState(goalDistance);
  const dispatch = useDispatch();

  const timeChange = text => {
    setTime(text);
  };
  const distanceChange = text => {
    setDistance(text);
  };

  const updateGoal = async () => {
    const res = await updateUserInfo(userId, {
      goalDistance: Number(distance),
      goalTime: Number(time),
    });
    if(res){
      const { achieves = [] } = res;
      if (achieves.length > 0) {
        dispatch(setBadges(achieves));
      }
    }
    navigation.navigate('Record', {refresh: {}});
  };
  return (
    <GoalSettingScreen
      time={time}
      distance={distance}
      timeChange={timeChange}
      distanceChange={distanceChange}
      updateGoal={updateGoal}
    />
  );
};

export default GoalSettingContainer;
