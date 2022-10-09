import { View, Text } from 'react-native';
import React from 'react';
import GettingWalkwayScreen from '../screen/GettingWalkwayScreen';
import { useState } from 'react';
import { useEffect } from 'react';

const GettingWalkwayContainer = ({ navigation, route }) => {
  const [walkways, setWalkways] = useState([]);
  
  const fetchData = async () => {
    const res = await getMyWalkList(1);
    if (res) {
      console.log(res);
      setWalkways(res);
    }
  };

  const handleClick = () => {
    navigation.navigate('CreateWalkway');
  };

  useEffect(() => {
    fetchData();
  },[]);

  return <GettingWalkwayScreen handleClick={handleClick} walkways={walkways}/>;
};

export default GettingWalkwayContainer;
