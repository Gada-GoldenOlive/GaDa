import React, {useEffect, useState} from 'react';
import {
  Platform,
  Keyboard,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
//import {SafeAreaView} from 'react-native-safe-area-context';
import {
  FeedFocusedIcon,
  FeedIcon,
  FriendsFocusedIcon,
  FriendsIcon,
  HomeFocusedIcon,
  HomeIcon,
  RecordFocusedIcon,
  RecordIcon,
} from '../constant/images/BottomTab';
import CustomImage from './CustomImage';

const getIcon = state => {
  switch (state) {
    case 'Home':
      return HomeIcon;
    case 'HomeFocused':
      return HomeFocusedIcon;
    case 'Feed':
      return FeedIcon;
    case 'FeedFocused':
      return FeedFocusedIcon;
    case 'Friends':
      return FriendsFocusedIcon;
    case 'FriendsFocused':
      return FriendsIcon;
    case 'Record':
      return RecordIcon;
    case 'RecordFocused':
      return RecordFocusedIcon;

    default:
      return Home;
  }
  // return Home;
};
const changeToKor = name => {
  switch (name) {
    case 'Home':
      return '홈';
    case 'Feed':
      return '피드';
    case 'Friends':
      return '친구';
    case 'Record':
      return '기록';
    default:
      return '';
  }
};
const BottomTabBar = ({state, handlePress}) => {
  return (
    //<SafeAreaView edges={['bottom']}>
      <View style={style.tabContainer}>
        {state.routes.map(({name, key}, index) => {
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              activeOpacity={1.0}
              key={key}
              style={{flex: 1}}
              onPress={() => handlePress(key, name)}>
              <View style={style.tab}>
                {isFocused ? (
                  <CustomImage
                    source={getIcon(`${name}Focused`)}
                    style={style.icon}
                  />
                ) : (
                  <CustomImage source={getIcon(`${name}`)} style={style.icon} />
                )}
                <View style={style.nameWrapper}>
                  <Text style={[style.name]}>{changeToKor(name)}</Text>
                </View>
                {/* {checkAlarmOpen(name) && <View style={style.alarm} />} */}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
   // </SafeAreaView>
  );
};
const CustomBottomTab = props => {
  const [visible, setVisible] = useState(true);
  const {state, navigation} = props;
  useEffect(() => {
    let keyboardEventListeners = [];
    if (Platform.OS === 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
        Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
      ];
    }
    return () => {
      if (Platform.OS === 'android') {
        keyboardEventListeners.length >= 1 &&
          keyboardEventListeners.forEach(eventListener =>
            eventListener.remove(),
          );
      }
    };
  }, []);
  const handlePress = (key, name) => {
    // setAlarmClose(name);
    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true,
    });

    // if ((name === 'Mypage' || name === 'Chatting') && !isAuthenticated) {
    //   UnkUserMeetSignUpMyPageBar();
    //   navigation.navigate('SignIn');
    // } else {
    //   navigation.navigate(name);
    // }
    navigation.navigate(name);
  };
  if (!visible) return null;

  return (
    <BottomTabBar
      state={state}
      handlePress={handlePress}
    />
  );
};

const style = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 29,
    height: 29,
  },
  nameWrapper: {
    marginTop: 3.5,
  },
  name: {
    fontSize: 10,
  },
});

export default CustomBottomTab;
