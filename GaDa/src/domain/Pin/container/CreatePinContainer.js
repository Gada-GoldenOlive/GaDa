import { View, Text } from 'react-native';
import React from 'react';
import CreatePinScreen from '../screen/CreatePinScreen';
import { useSelector } from 'react-redux';

const CreatePinContainer = () => {
  const { pinImage } = useSelector(state => state.images);
  return <CreatePinScreen pinImage={pinImage} />;
};

export default CreatePinContainer;
