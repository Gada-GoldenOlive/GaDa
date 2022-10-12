import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { boldFontFamily } from '../constant/fonts';
import FriendsContainer from '../domain/Friends/container/FriendsContainer';

const Stack = createStackNavigator();
const friendsScreen = {
  Friends: FriendsContainer,
};
const FriendsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Friends"
      screenOptions={{
        headerShown: true,
        cardStyle: { backgroundColor: 'white' },
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: boldFontFamily,
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
      }}
    >
      {Object.entries({ ...friendsScreen }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title: '',
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default FriendsNavigator;
