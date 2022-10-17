import React from 'react';
import GettingWalkwayScreen from '../screen/GettingWalkwayScreen';
import { useState } from 'react';
import { useEffect } from 'react';
import { getNoReviewWalks } from '../../../APIs/walkway';

const GettingWalkwayContainer = ({ navigation, route }) => {
  const [walkways, setWalkways] = useState([]);
  const [clickable, setClickable] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    const res = await getNoReviewWalks();
    if (res) {
      const { walks } = res;
      setWalkways(walks);
    }
  };

  const handleClick = () => {
    navigation.navigate('CreateWalkway', {item: selectedItem});
  };

  const clickItem = item => {
    if (selectedItem === item) {
      setSelectedItem(null);
      setClickable(false);
    } else {
      setSelectedItem(item);
      setClickable(true);
    }
  };
  console.log(selectedItem);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GettingWalkwayScreen
      handleClick={handleClick}
      walkways={walkways}
      clickable={clickable}
      clickItem={clickItem}
      selectedItem={selectedItem}
    />
  );
};

export default GettingWalkwayContainer;
