import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { backgroundColor, borderColor } from '../../../constant/colors';
import { boldFontFamily } from '../../../constant/fonts';
import { FlatList } from 'react-native-gesture-handler';
import CustomImage from '../../../components/CustomImage';

const FriendsAlarmScreen = ({
  alarmList,
  handleAcceptButton,
  handleRefuseButton,
  onRefresh,
  refreshing,
}) => {
  const renderItem = ({ item = {}, index }) => {
    const { id, userId, loginId, name, image } = item;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.flexDirection}>
          <View style={styles.flexDirection}>
            <CustomImage style={styles.userImg} source={image} />
            <View>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.userId}>{loginId}</Text>
            </View>
          </View>
          <View style={styles.flexDirection}>
            <TouchableWithoutFeedback onPress={() => handleAcceptButton(id)}>
              <View style={[styles.addButtonWrapper, { marginRight: 9 }]}>
                <Text style={styles.addButtonText}>수락</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleRefuseButton(id)}>
              <View
                style={[
                  styles.addButtonWrapper,
                  { backgroundColor: '#C6C6C6' },
                ]}
              >
                <Text style={styles.addButtonText}>무시</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {alarmList.length > 0 ? (
        <FlatList
          data={alarmList}
          renderItem={(item, index) => renderItem(item, index)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, marginTop: 13 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={styles.nullContainer}>
          <Text style={styles.nullTitle}>친구 신청 목록이 없습니다</Text>
        </View>
      )}
    </View>
  );
};

export default FriendsAlarmScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },

  itemContainer: {
    paddingVertical: 20.5,
    borderBottomWidth: 1,
    borderColor: borderColor,
  },
  userName: {
    fontSize: 18,
    fontFamily: boldFontFamily,
    letterSpacing: -0.36,
    color: 'black',
  },
  userId: {
    marginTop: 2,
    fontSize: 12,
    letterSpacing: -0.24,
    color: '#929292',
  },
  userImg: {
    width: 42,
    height: 42,
    marginRight: 13,
  },
  flexDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButtonWrapper: {
    backgroundColor: '#49d492',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: 'white',
    fontFamily: boldFontFamily,
  },
  nullContainer: {
    paddingTop: 24,
    alignItems: 'center',
  },
});
