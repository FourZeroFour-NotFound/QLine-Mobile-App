import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from './Login';
import Header from './Header';


const Stacks = createStackNavigator({
    Home: { screen: Home },
    Search: { screen: Header },
  });
  
  export default Stacks



