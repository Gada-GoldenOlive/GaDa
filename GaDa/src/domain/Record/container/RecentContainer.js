import React from 'react';
import RecentScreen from '../screen/RecentScreen';

const RecentContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { recentWalks = [] } = params;

  const handleDetailPin = () => {
    navigation.navigate('DetailPin');
  };
  const handleNavigateRestart = item => {
    navigation.navigate('RestartWalks', {item: item});
  }
  return <RecentScreen handleNavigateRestart={handleNavigateRestart} recentWalks={recentWalks}/>;
};

export default RecentContainer;
