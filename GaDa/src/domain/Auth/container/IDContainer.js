import { View, Text } from 'react-native';
import React from 'react';
import IDScreen from '../screen/IDScreen';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../../redux/modules/user';

const IDContainer = ({ navigation }) => {
  const [isWrong, setIsWrong] = useState(false);
  const { userId } = useSelector(state => state.status);
  const dispatch = useDispatch();
  const handleIdChange = idText => {
    dispatch(setUserId(idText));
  };
  const handleNavigate = () => {
    navigation.navigate('PW');
  };

  return (
    <IDScreen
      isWrong={isWrong}
      userId={userId}
      handleNavigate={handleNavigate}
      handleIdChange={handleIdChange}
    />
  );
};

export default IDContainer;
