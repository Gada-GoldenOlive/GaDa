import React, { useState } from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import BottomTab from './BottomTab';
import CreatePinContainer from '../domain/Pin/container/CreatePinContainer';
import BackButton from '../components/BackButton';
const createPinScreen = {
  CreatePin: CreatePinContainer,
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
      <RootStack.Screen name="BottomTab" component={BottomTab} />
    </RootStack.Navigator>
  );
};
export default RootNavigation;
