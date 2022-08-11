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

const createPinScreen = {
  CreatePin: CreatePinContainer,
};
const detailImageScreen = {
  DetailImage: DetailImage,
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
      <RootStack.Screen name="BottomTab" component={BottomTab} />
    </RootStack.Navigator>
  );
};
export default RootNavigation;
