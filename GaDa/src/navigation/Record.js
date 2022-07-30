import {useNavigation} from '@react-navigation/core';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import RecordContainer from '../domain/Record/containers/RecordContainer';

const Stack = createStackNavigator();
const recordScreen = {
  Record: RecordContainer
}

const RecordNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Record"
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
      }}>
         {Object.entries({ ...recordScreen }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title: '기록',
          }}
        />
      ))}
      </Stack.Navigator>
  );
};

export default RecordNavigator;
