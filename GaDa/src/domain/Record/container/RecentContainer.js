import React from 'react';
import RecentScreen from '../screen/RecentScreen';

const RecentContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { recentWalks = [] } = params;

  const handleDetailPin = () => {
    navigation.navigate('DetailPin');
  };
  return <RecentScreen handleDetailPin={handleDetailPin} recentWalks={recentWalks}/>;
};

export default RecentContainer;
