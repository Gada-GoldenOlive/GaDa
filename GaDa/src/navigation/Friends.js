import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import FriendsContainer from '../domain/Friends/container/FriendsContainer'

const Stack = createStackNavigator();
const friendsScreen = {
  Friends: FriendsContainer
}
const FriendsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Friends"
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
        {Object.entries({ ...friendsScreen }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title: '친구',
          }}
        />
      ))}
      </Stack.Navigator>
  );
};

export default FriendsNavigator;
