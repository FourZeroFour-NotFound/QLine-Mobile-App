import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import TabBarIcon from '../components/TabBarIcon';
import Search from '../screens/search';
import MyTickets from '../screens/myTickets';
import MyProfile from '../screens/myProfile';

const SearchStack = createStackNavigator({
  Search: Search,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-search`
          : 'md-search'
      }
    />
  ),
};

const TicketsStack = createStackNavigator({
  Tickets: MyTickets,
});

TicketsStack.navigationOptions = {
  tabBarLabel: 'My Tickets',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: MyProfile,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'My Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  SearchStack,
  TicketsStack,
  ProfileStack,
});
