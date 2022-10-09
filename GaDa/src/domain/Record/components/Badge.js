import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  distance,
  comment,
  defaultImage,
} from '../../../constant/images/Badge';
import CustomImage from '../../../components/CustomImage';

const Badge = ({ badgeList = [] }) => {
  const tempList = [
    { type: 'distance', num: 5 },
    { type: 'comment', num: 5 },
    {},
    {},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {tempList.map(({ type, num }) => {
          if (type === 'distance') {
            return <CustomImage source={distance} style={styles.image} />;
          }
          if (type === 'comment') {
            return <CustomImage source={comment} style={styles.image} />;
          }
          return <CustomImage source={defaultImage} style={styles.image} />;
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
