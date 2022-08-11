import { View, Text } from 'react-native';
import React, { useState } from 'react';
import RecordScreen from '../screen/RecordScreen';
import { setBottomTabVisible } from '../../../redux/modules/status';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const RecordContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [walkEnd, setWalkEnd] = useState(false);
  const dispatch = useDispatch();
  const handleConfirm = () => {
    setWalkEnd(true);
    setIsVisible(false);
  };
  useEffect(() => {
    dispatch(setBottomTabVisible(isVisible));
  }, [isVisible]);
  return (
    <RecordScreen
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      setWalkEnd={setWalkEnd}
      handleConfirm={handleConfirm}
      walkEnd={walkEnd}
    />
  );
};

export default RecordContainer;
