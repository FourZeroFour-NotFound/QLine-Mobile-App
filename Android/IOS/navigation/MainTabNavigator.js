import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import TabBarIcon from '../components/TabBarIcon';
import Search from '../screens/search';
import MyTickets from '../screens/myTickets';
import ManageTickets from '../screens/manageTickets';

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

const ManageStack = createStackNavigator({
  Manage: ManageTickets,
});

ManageStack.navigationOptions = {
  tabBarLabel: 'Manage Tickets',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
    />
  ),
};

export default createBottomTabNavigator({
  SearchStack,
  TicketsStack,
  ManageStack,
});
