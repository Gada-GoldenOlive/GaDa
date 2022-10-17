import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './Home';
import FeedNavigator from './Feed';
import FriendsNavigator from './Friends';
import RecordNavigator from './Record';
import CustomBottomTab from '../components/CustomBottomTab';
import { View } from 'react-native';
const Tab = createBottomTabNavigator();

const bottomTabScreens = {
  BottomTabHome: HomeNavigator,
  BottomTabFeed: FeedNavigator,
  BottomTabFriends: FriendsNavigator,
  BottomTabRecord: RecordNavigator,
};
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
      initialRouteName="BottomTabHome"
      tabBar={props => <CustomBottomTab {...props} />}
    >
      {Object.entries({
        ...bottomTabScreens,
      }).map(([name, component]) => (
        <Tab.Screen
          options={{
            unmountOnBlur: true,
          }}
          listeners={({ navigation }) => ({
            blur: () => navigation.setParams({ screen: undefined }),
          })}
          key={name}
          name={name}
          component={component}
        />
      ))}
    </Tab.Navigator>
  );
};
export default BottomTab;
