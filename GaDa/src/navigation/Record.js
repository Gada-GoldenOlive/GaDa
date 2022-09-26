import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import BackButton from '../components/BackButton';
import GoalSettingContainer from '../domain/Record/container/GoalSettingContainer';
import RecordContainer from '../domain/Record/container/RecordContainer';
import SettingPageContainer from '../domain/Record/container/SettingPageContainer';
import RecentContainer from '../domain/Record/container/RecentContainer';

const Stack = createStackNavigator();
const recordScreen = {
  Record: RecordContainer,
};
const goalSettingScreen = {
  GoalSetting: GoalSettingContainer,
};
const settingPageScreen = {
  SettingPage: SettingPageContainer,
};
const recentScreen = {
  Recent: RecentContainer,
};
const RecordNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Record"
      screenOptions={{
        headerShown: true,
        cardStyle: { backgroundColor: 'white' },
        headerTitleStyle: {
          fontSize: 16,
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
      {Object.entries({ ...goalSettingScreen }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerLeft: () => <BackButton />,
            title: '달성목표 설정',
          }}
        />
      ))}
      {Object.entries({ ...settingPageScreen }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerLeft: () => <BackButton />,
            title: '설정',
          }}
        />
      ))}
      {Object.entries({ ...recentScreen }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerLeft: () => <BackButton />,
            title: '최근 활동',
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default RecordNavigator;
