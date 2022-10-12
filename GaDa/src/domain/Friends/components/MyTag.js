import { StyleSheet, View } from 'react-native';
import React from 'react';
import { mediumFontFamily } from '../../../constant/fonts';
import Text from '../../../components/MyText';

const MyTag = ({ userId, id }) => {
  return (
    userId === id && (
      <View style={styles.myTagWrapper}>
        <Text style={styles.myTagText}>MY</Text>
      </View>
    )
  );
};

export default MyTag;

const styles = StyleSheet.create({
  myTagWrapper: {
    paddingHorizontal: 5.5,
    paddingVertical: 1,

    borderRadius: 15,
    backgroundColor: 'black',

    marginLeft: 5,
  },
  myTagText: {
    fontFamily: mediumFontFamily,
    fontSize: 10,
    color: 'white',
  },
});
