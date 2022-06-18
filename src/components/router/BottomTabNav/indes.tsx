import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeScreen from '../../../screens/HomeScreen';
import ShoppingCartScreen from '../../../screens/ShoppingCartScreen';
import HomeStack from './HomeStack';
import CartScreenStack from './CartScreenStack';

const BottomTabNav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fcba03',
        tabBarInactiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="user" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Shopping-Cart"
        component={CartScreenStack}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="shopping-cart" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="menu" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
