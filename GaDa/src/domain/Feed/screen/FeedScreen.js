import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PinInformation from '../../Home/components/PinInformation';

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Text>FeedScreen</Text> */}
      <PinInformation />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
