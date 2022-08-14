import { View } from 'react-native';
import React, { useEffect } from 'react';
import FriendsScreen from '../screen/FriendsScreen';
import { getIdInLocalStorage } from '../../../function';
import { useState } from 'react';

const FriendsContainer = ({ navigation, route }) => {
  const [id, setId] = useState('');
  const getId = async () => {
    const res = await getIdInLocalStorage();
    setId(res);
  };
  useEffect(() => {
    getId();
    if (id == null && id !== '') {
      navigation.navigate('ID');
    }
  }, [id]);
  return <FriendsScreen />;
};
export default FriendsContainer;
