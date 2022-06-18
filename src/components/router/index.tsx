import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectLoginRegister from '../../screens/SelectLoginRegister';
import BottomTabNav from './BottomTabNav/indes';
import CountrySelection from '../../screens/CountrySelectionScreen';
import CountriesInformation from '../../data/country';
import LanguageChange from '../../screens/CountrySelectionScreen/index2';
import SelectionScreen from '../../screens/SelectionScreen';
import Selection from '../CountrySelection';
import {BackHandler} from 'react-native';
import cart from '../../context';
import {reducer} from '../../context/reducer';

const Router = () => {
  const [CountriesInfo, setCountriesInfo] =
    React.useState(CountriesInformation);
  const [SelectedItem, setSelectedItem] = React.useState(CountriesInfo[0]);
  const initialState = {
    cartItem: [],
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const addToCart = item => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: item,
    });
  };

  const removeFromCart = item => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: item,
    });
  };

  React.useEffect(() => {
    // const backHandler=BackHandler.addEventListener('hardwareBackPress',()=>true)
    // return ()=>backHandler.remove()

  }, [])    
  // Know more about it

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <cart.Provider
        value={{
          cartItems: state,
          addToCart: addToCart,
          removeFromCart: removeFromCart,
        }}>
        <Stack.Navigator>
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="UserSelection">
              {() => <CountrySelection SelectedItem={SelectedItem} />}
            </Stack.Screen>

            <Stack.Screen name="Language-Change">
              {() => (
                <LanguageChange
                  SelectedItem={SelectedItem}
                  setSelectedItem={setSelectedItem}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SelectionScreen">
              {() => (
                <SelectionScreen
                  SelectedItem={SelectedItem}
                  setSelectedItem={setSelectedItem}
                  CountriesInfo={CountriesInfo}
                />
              )}
            </Stack.Screen>
            
          </Stack.Group>

          <Stack.Screen
            name="UserAccount"
            options={{headerBackVisible: false, headerShown: false}}>
            {() => <SelectLoginRegister countryCodeUser={SelectedItem.phone} />}
          </Stack.Screen>

          <Stack.Screen
            name="BottomTabNav"
            options={{headerShown: false}}
            component={BottomTabNav}
          />
        </Stack.Navigator>
      </cart.Provider>
    </NavigationContainer>
  );
};

export default Router;
