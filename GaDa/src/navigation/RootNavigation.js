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
import FriendRecordContainer from '../domain/Friends/container/FriendRecordContainer';

// mypage
import BadgeListContainer from '../domain/Record/container/BadgeListContainer';

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
const friendRecordScreen = {
  FriendRecord: FriendRecordContainer,
};

const modifyNicknameScreen = {
  ModifyNickname: ModifyNicknameContainer,
};

const badgeListScreen = {
  BadgeList: BadgeListContainer,
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
      {Object.entries({ ...modifyNicknameScreen }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => {
            return {
              headerShown: true,
              headerLeft: () => <BackButton />,
            };
          }}
        />
      ))}
      {Object.entries({ ...badgeListScreen }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => {
            return {
              headerShown: true,
              headerLeft: () => <BackButton />,
              title: '배지',
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
            };
          }}
        />
      ))}
      {Object.entries({ ...friendRecordScreen }).map(([name, component]) => (
        <RootStack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => {
            return {
              headerShown: true,
              headerLeft: () => <BackButton />,
              headerTitle: '',
            };
          }}
        />
      ))}

      <RootStack.Screen name="BottomTab" component={BottomTab} />
    </RootStack.Navigator>
  );
};
export default RootNavigation;
