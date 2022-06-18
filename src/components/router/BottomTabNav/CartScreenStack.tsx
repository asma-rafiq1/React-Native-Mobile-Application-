import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from '../../../screens/ProductScreen';
import ShoppingCartScreen from '../../../screens/ShoppingCartScreen';
import AdddressScreen from '../../../screens/AddressScreen';


const CartScreenStack = () => {
    const Stack=createNativeStackNavigator()
  return (
    
     <Stack.Navigator screenOptions={{headerShown:false}} >
         <Stack.Screen name='Cart' component={ShoppingCartScreen}/>
         <Stack.Screen name='Address' component={AdddressScreen}/>
     </Stack.Navigator>
 
  )
}

export default CartScreenStack