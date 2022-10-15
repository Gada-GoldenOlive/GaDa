import React from 'react';
import BadgeListScreen from '../screen/BadgeListScreen';

const BadgeListContainer = ({ navigation, route }) => {
  const { params = {} } = route;
  const { badgeList } = params;

  return <BadgeListScreen badgeList={badgeList} />;
};

export default BadgeListContainer;
