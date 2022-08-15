import { View } from 'react-native';
import React, { useEffect } from 'react';
import FriendsScreen from '../screen/FriendsScreen';
import { getIdInLocalStorage } from '../../../function';
import { useState } from 'react';

const FriendsContainer = ({ navigation, route }) => {
  return <FriendsScreen />;
};
export default FriendsContainer;
