import React from 'react';
import GettingWalkwayScreen from '../screen/GettingWalkwayScreen';
import { useState } from 'react';
import { useEffect } from 'react';
import { getMyWalkList } from '../../../APIs/walkway';

const GettingWalkwayContainer = ({ navigation, route }) => {
  const [walkways, setWalkways] = useState([]);
  const [clickable, setClickable] = useState(false);

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

  return <GettingWalkwayScreen handleClick={handleClick} walkways={walkways} clickable={clickable}/>;
};

export default GettingWalkwayContainer;
