import React, { useState } from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import BottomTab from './BottomTab';
import CreatePinContainer from '../domain/Pin/container/CreatePinContainer';
import BackButton from '../components/BackButton';
import DetailImage from '../domain/Image/DetailImage';
// IMAGE EDIT
import ImageSubmitButton from '../components/ImageSubmitButton';
import CloseButton from '../components/CloseButton';
// LOGIN
import SignInContainer from '../domain/Auth/container/SignInContainer';
import IDContainer from '../domain/Auth/container/IDContainer';
import PWContainer from '../domain/Auth/container/PWContainer';
import NicknameContainer from '../domain/Auth/container/NicknameContainer';
import ModifyNicknameContainer from '../domain/Auth/container/ModifyNicknameContainer';

// FRIENDS
import AddFriendsContainer from '../domain/Friends/container/AddFriendsContainer';
import FriendsAlarmContainer from '../domain/Friends/container/FriendsAlarmContainer';

// mypage
import BadgeListContainer from '../domain/Record/container/BadgeListContainer';

// feed
import GettingWalkwayContainer from '../domain/Feed/container/GettingWalkwayContainer';
import DetailFeedContainer from '../domain/Feed/container/DetailFeedContainer';
import { View } from 'react-native';
import CreateWalkwayContainer from '../domain/Feed/container/CreateWalkwayContainer';
import ModifyPWContainer from '../domain/Auth/container/ModifyPWContainer';
import MyRecordContainer from '../domain/Record/container/MyRecordContainer';

const createPinScreen = {
  CreatePin: CreatePinContainer,
};
const detailImageScreen = {
  DetailImage: DetailImage,
};
const authScreens = [
  {
    name: 'ID',
    screen: IDContainer,
  },
  {
    name: 'PW',
    screen: PWContainer,
  },
  {
    name: 'Nickname',
    screen: NicknameContainer,
  },
  {
    name: 'MyRecord',
    screen: MyRecordContainer
  }
];
const signInScreen = {
  SignIn: SignInContainer,
};
const addFriendsScreen = {
  addFriends: AddFriendsContainer,
};
const friendsAlarmScreen = {
  friendsAlarm: FriendsAlarmContainer,
};

const modifyScreens = [
  {
    name: 'ModifyNickname',
    screen: ModifyNicknameContainer,
    title: '프로필 수정',
  },
  { name: 'ModifyPW', screen: ModifyPWContainer, title: '비밀번호 재설정' },
];

const badgeListScreen = {
  BadgeList: BadgeListContainer,
};

const gettingWalkwayScreen = {
  GettingWalkway: GettingWalkwayContainer,
};
// feed
const detailFeedScreen = {
  DetailFeed: DetailFeedContainer,
};
const createWalkwayScreen = {
  CreateWalkway: CreateWalkwayContainer,
};

const RootStack = createStackNavigator();
const RootNavigation = () => {
  const navigation = useNavigation();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerMode: 'float',
        gestureDirection: 'horizontal',
        headerShown: false,
        cardStyle: { backgroundColor: '#fff', opacity: 1 },
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomColor: '#eaeaea',
          borderBottomWidth: 0.5,
        },
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        presentation: 'modal',
      }}
      initialRouteName="BottomTab"
    >
      {Object.entries({
        ...createPinScreen,
      }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title: '핀 작성하기',
            headerShown: true,
            headerLeft: () => <BackButton />,
          }}
        />
      ))}
      {Object.entries({ ...detailImageScreen }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => {
            const { params } = route;
            const { images, ver, body } = params;
            if (ver === 'pin') {
              return {
                title: 'pin',
                headerShown: true,
                headerLeft: () => <BackButton />,
                headerRight: () => (
                  <ImageSubmitButton imageList={images} body={body} ver={ver} />
                ),
              };
            }
            return {
              title: '상세 이미지',
              headerShown: true,
              headerLeft: null,
              headerRight: () => <CloseButton />,
            };
          }}
        />
      ))}
      {modifyScreens.map(({ name, screen, title}) => {
        return (
          <RootStack.Screen
            key={name}
            name={name}
            component={screen}
            options={{
              headerTitle: title,
              headerShown: true,
              headerLeft: () => <BackButton />,
            }}
          />
        );
      })}
      {Object.entries({ ...signInScreen }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => {
            return {
              headerShown: false,
              headerLeft: null,
            };
          }}
        />
      ))}
      {authScreens.map(({ name, screen }) => {
        return (
          <RootStack.Screen
            key={name}
            name={name}
            component={screen}
            options={{
              headerTitle: '',
              headerShown: true,
              headerLeft: () => <BackButton />,
            }}
          />
        );
      })}
      {Object.entries({ ...badgeListScreen }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => {
            return {
              headerShown: true,
              headerTitle: '배지',
              headerLeft: () => <BackButton />,
            };
          }}
        />
      ))}
      {Object.entries({ ...addFriendsScreen }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => {
            return {
              headerShown: true,
              headerLeft: () => <BackButton />,
              headerTitle: '친구검색',
              title: '프로필 수정',
            };
          }}
        />
      ))}
      {Object.entries({ ...friendsAlarmScreen }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => {
            return {
              headerShown: true,
              headerLeft: () => <BackButton />,
              headerTitle: '친구 신청내역',

              title: '배지',
            };
          }}
        />
      ))}
      {Object.entries({ ...gettingWalkwayScreen }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => {
            return {
              headerShown: true,
              headerLeft: () => <BackButton />,
              headerTitle: '산책로 가져오기',
            };
          }}
        />
      ))}
      {Object.entries({ ...detailFeedScreen }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => {
            return {
              headerShown: true,
              headerTransparent: true,
              headerLeft: () => <BackButton />,
              headerTitle: '',
            };
          }}
        />
      ))}
      {Object.entries({ ...createWalkwayScreen }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => {
            return {
              headerShown: true,
              headerLeft: () => <BackButton />,
              headerTitle: '산책로 등록',
            };
          }}
        />
      ))}
      <RootStack.Screen name="BottomTab" component={BottomTab} />
    </RootStack.Navigator>
  );
};
export default RootNavigation;
