import {View, Text} from 'react-native';
import React, { useState } from 'react';
import HomeScreen from '../screen/HomeScreen'
const HomeContainer = ({route, navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const openModal = () => {
    setIsVisible(true)
  }
  const closeModal = () => {
    setIsVisible(false)
  }
  return (
    <HomeScreen isVisible={isVisible} openModal={openModal} closeModal={closeModal}/>
  );
};

export default HomeContainer;
