import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  boldFontFamily,
  boldFontSize,
  mediumFontFamily,
} from '../../../constant/fonts';
import { descriptionColorVer2, mainColor } from '../../../constant/colors';
import MyRecordList from '../components/MyRecordList';
import Text from '../../../components/MyText';

const MyRecordScreen = () => {
  return (

    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.topTitle}>Total</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>32847분</Text>
            <View style={styles.totalView} />
            <Text style={styles.totalText}>21,423m</Text>
          </View>
        </View>
        <MyRecordList />
      </View>
    </ScrollView>
  );
};

export default MyRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topContainer: {
    paddingVertical: 20,
  },
  topTitle: {
    fontFamily: mediumFontFamily,
    fontSize: boldFontSize,
    color: descriptionColorVer2,
  },
  totalContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  totalText: {
    fontFamily: boldFontFamily,
    fontSize: 24,
    color: mainColor,
  },
  totalView: {
    width: 1,
    height: 30,
    backgroundColor: 'rgb(215,215,215)',
    marginHorizontal: 13.5,
  },
});
