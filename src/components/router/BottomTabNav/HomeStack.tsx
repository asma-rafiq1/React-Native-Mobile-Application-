import {View, Text, TextInput, Pressable} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductScreen from '../../../screens/ProductScreen';
import Feather from 'react-native-vector-icons/Feather';
import SearchBar from 'react-native-platform-searchbar';
import ProductsScreen from '../../../screens/ProductsScreen';
import ProductCard from '../../ProductCard';
import ProductDetailScreen from '../../../screens/ProductDetailScreen';
import {useNavigation} from '@react-navigation/native';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from '../../../../firebase-config';

const HeaderComp = ({searchValue, setSearchValue}) => {
  const navigation = useNavigation();

  const getSearch = async () => {
    try {
      const q = query(collection(db, 'Fashion'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const productss = doc.data();
        const newp = productss.productdetail.filter(item => {
          return (
            item.brandName.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.productShortDescription
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          );
        });

        navigation.navigate('ProductsScreen', {category: newp});
      });
    } catch (error) {
      console.log(error);
    }
  };
  //firebase filters array?
  //correct filtering with efficinet code
  //firebase full
  //mongodb realm


  return (
    <View style={{backgroundColor: '#2ea3a1', width: '100%', padding: 10}}>
      <SearchBar
        inputStyle={{paddingVertical: 8}}
        value={searchValue}
        onChangeText={value => {
          setSearchValue(value);
        }}
        placeholder="Search Amazon.in"
        iconColor="#000"
      />
      {searchValue ? (
        <>
          <Pressable
            onPress={getSearch}
            style={{position: 'absolute', right: 50, top: 22}}>
            <Text style={{color: '#000'}}>Search</Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
};
const HomeStack = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => (
          <HeaderComp
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ),
      }}>
      <Stack.Screen name="Home-Screen">{() => <HomeScreen />}</Stack.Screen>
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
