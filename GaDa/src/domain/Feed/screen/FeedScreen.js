import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import PinInformation from '../../Home/components/PinInformation';
import WalkwayOverview from '../../Home/components/WalkwayOverview';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import WalkEnd from '../../../components/WalkEnd';
import CustomImage from '../../../components/CustomImage';
import { FeedS, MyS } from '../../../constant/images/Sample';
import { windowHeight, windowWidth } from '../../../constant/styles';
import Writing from '../../../constant/images/Writing';
import Text from '../../../components/MyText';
import { boldFontFamily } from '../../../constant/fonts';
import { blackColor } from '../../../constant/colors';
import FilteringButton from '../../../components/FilteringButton';
import FeedItemList from '../components/FeedItemList';

const FeedScreen = ({handleGettingWalkway, handleDetailFeed}) => {
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>피드</Text>
        <FilteringButton />
        <TouchableWithoutFeedback onPress={handleGettingWalkway}>
          <View style={styles.writeWrapper}>
            <CustomImage
              style={styles.writing}
              source={Writing}
              tintColor="white"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <FeedItemList handleDetailFeed={handleDetailFeed}/>
    </ScrollView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 21,
    paddingTop: 3,
  },
  title: {
    fontFamily: boldFontFamily,
    fontSize: 20,
    lineHeight: 31,
    color: blackColor,
    marginEnd: 8,
  },
  writeWrapper: {
    width: 37,
    height: 37,
    padding: 7,
    borderRadius: 100,
    backgroundColor: blackColor,
  },
  middleContainer: {
    paddingTop: 19,
    paddingBottom: 11,
    paddingStart: 16,
  },
  
});
