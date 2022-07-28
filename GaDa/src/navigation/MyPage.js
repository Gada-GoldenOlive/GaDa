import {useNavigation} from '@react-navigation/core';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

const MyPageNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={{
        headerShown: true,
        cardStyle: {backgroundColor: 'white'},
        headerTitleStyle: {
          fontFamily: boldFontFamily,
          fontSize: boldFontSize,
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomColor: '#eaeaea',
          borderBottomWidth: 0.5,
        },
        unmountOnBlur: true,
        title: {},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleAlign: 'center',
      }}></Stack.Navigator>
  );
};

export default MyPageNavigator;
