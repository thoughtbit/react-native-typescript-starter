import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotFoundScreen from '../screens/NotFoundScreen';
import { MainNavigator } from './main.navigator';

type RootStackParamList = {
  Main: undefined;
  NotFound: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Main' component={MainNavigator} />
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: '未知页面' }} />
    </Stack.Navigator>
  );
};
