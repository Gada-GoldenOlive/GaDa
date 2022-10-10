import React from 'react';
import GoalSettingScreen from '../screen/GoalSettingScreen';
import { useState } from 'react';
import { updateUserInfo } from '../../../APIs/user';

const GoalSettingContainer = ({ route, navigation }) => {
  const { params = {} } = route;
  const { goalInfo = {}, userId } = params;
  const { goalTime, goalDistance } = goalInfo;
  const [time, setTime] = useState(goalTime);
  const [distance, setDistance] = useState(goalDistance);

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
    console.log(res);
    navigation.navigate('Record', {refresh: {}});
  };
  /*
          <MyTextInput
          placeholder="새 비밀번호 입력(6글자 이상)"
          style={[
            styles.textinput,
            (newWrong || checkWrong) && {
              borderBottomColor: errorColor,
              borderBottomWidth: 2,
            },
          ]}
          onChangeText={newChange}
          value={newText}
          secureTextEntry={true}
        />
   */
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
