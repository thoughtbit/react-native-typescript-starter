import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import MessageScreen from "../screens/MessageScreen";
import TribeScreen from "../screens/TribeScreen";
import MineScreen from "../screens/MineScreen";
import ExampleScreen, { examples } from "../screens/ExampleScreen";
import ProfileScreen from "../screens/mine/ProfileScreen";


type BottomTabParamList = {
  Home: undefined;
  Message: undefined;
  Tribe: undefined;
  Mine: undefined;
  Example: undefined;
};
type HomeParamList = {
  HomeScreen: undefined;
};

type MessageParamList = {
  MessageScreen: undefined;
};

type TribeParamList = {
  TribeScreen: undefined;
};

type MineParamList = {
  MineScreen: undefined;
  ProfileScreen: undefined;
}

type ExampleParamList = {
  ExampleScreen: undefined;
}

const HomeStack = createStackNavigator<HomeParamList>();
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: '首页' }}
      />
    </HomeStack.Navigator>
  );
};

const MessageTopTabStack = createMaterialTopTabNavigator();
const MessageTopTabNavigator = () => {
  return(
    <MessageTopTabStack.Navigator>
      <MessageTopTabStack.Screen
        name="Message1"
        options={{ tabBarLabel: '未读' }}
        component={MessageScreen}
      />
      <MessageTopTabStack.Screen
        name="Message2"
        options={{ tabBarLabel: '已读' }}
        component={MessageScreen}
      />
    </MessageTopTabStack.Navigator>
  );
}
const MessageStack = createStackNavigator<MessageParamList>();
const MessageNavigator = () => {
  return (
    <MessageStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <MessageStack.Screen
        name="MessageScreen"
        component={MessageTopTabNavigator}
        options={{ headerTitle: '消息' }}
      />
    </MessageStack.Navigator>
  );
};

const TribeStack = createStackNavigator<TribeParamList>();
const TribeNavigator = () => {
  return (
    <TribeStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <TribeStack.Screen
        name="TribeScreen"
        component={TribeScreen}
        options={{ headerTitle: '部落' }}
      />
    </TribeStack.Navigator>
  );
};

const MineStack = createStackNavigator<MineParamList>();
const MineNavigator = () => {
  return (
    <MineStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <MineStack.Screen
        name="MineScreen"
        component={MineScreen}
        options={{ headerTitle: '我的' }}
      />
      <MineStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </MineStack.Navigator>
  );
};

const ExampleStack = createStackNavigator<ExampleParamList>();
const ExampleNavigator = () => {
  return (
    <ExampleStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <ExampleStack.Screen
        name="ExampleScreen"
        component={ExampleScreen}
        options={{ headerTitle: '演示' }}
      />
      {
        (Object.keys(examples) as Array<keyof typeof examples>).map((id) => (
          <ExampleStack.Screen
            key={id}
            name={id}
            component={examples[id]}
            options={{ title: examples[id].title }}
          />
        ))
      }
    </ExampleStack.Navigator>
  );
};



const TabBar = createBottomTabNavigator<BottomTabParamList>();
const TabBarIcon = (props: { name: string; color: string; }) => {
  return (<Ionicons size={24} style={styles.icon} {...props} />);
}
export const MainNavigator = () => {
  return (
    <TabBar.Navigator
      tabBarOptions={{ labelStyle: styles.label }}
      initialRouteName='Home'
    >
      <TabBar.Screen
        name='Home'
        component={HomeNavigator}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
        }}
      />
      <TabBar.Screen
        name='Message'
        component={MessageNavigator}
        options={{
          tabBarLabel: '消息',
          tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
          tabBarBadge: 3,
        }}
      />
      <TabBar.Screen
        name='Tribe'
        component={TribeNavigator}
        options={{
          tabBarLabel: '部落',
          tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
        }}
      />
      <TabBar.Screen
        name='Example'
        component={ExampleNavigator}
        options={{
          tabBarLabel: '演示',
          tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
        }}
      />
      <TabBar.Screen
        name='Mine'
        component={MineNavigator}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
        }}
      />
    </TabBar.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {fontWeight: '600', marginBottom: Platform.OS === 'ios' ? 0 : 8 },
  icon: {
    marginBottom: Platform.OS === 'ios' ? -3 : 0
  },
});
