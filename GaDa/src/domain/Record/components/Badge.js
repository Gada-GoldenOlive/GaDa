import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  distance,
  comment,
  defaultImage,
} from '../../../constant/images/Badge';
import CustomImage from '../../../components/CustomImage';
import { useState } from 'react';
import { useEffect } from 'react';
const Badge = ({ badgeList = [] }) => {
  const [achieveList, setAchieveList] = useState([]);

  useEffect(() => {
    let tempList = [];
    badgeList.map(item => {
      const { badge, status } = item;
      const { image, title } = badge;
      if (status === 'ACHIEVE') {
        tempList.push(item);
      }
    });

    if (tempList.length < 4) {
      tempList = [
        ...tempList,
        ...Array(4 - tempList.length).fill({badge: {}}),
      ];
    }
    setAchieveList(tempList);
  }, [badgeList]);

  // {badge : {image, title}, status}
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {achieveList.map(({ badge, status }, index) => {
          if (badge.title) {
            const { image, title } = badge;
            return <CustomImage key={`${badge.title}-${index}`} source={{ uri: image }} style={styles.image} />;
          } else {
            return <CustomImage key={`${badge.title}-${index}`} source={defaultImage} style={styles.image} />;
          }
        })}
      </View>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingTop: 23,
    paddingBottom: 21,
    marginTop: 18,
    justifyContent: 'space-between',
  },
  image: {
    width: 70,
    height: 70,
  },
});
