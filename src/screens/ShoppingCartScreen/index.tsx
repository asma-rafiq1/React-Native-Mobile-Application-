import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import CartItem from '../../components/CartItem';
import cartData from '../../data/cart';
import cart from '../../context/index';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';

const ShoppingCartScreen = () => {
  const cartFunc = React.useContext(cart);
  const navigation = useNavigation();
  const totalPrice = cartFunc.cartItems.cartItem.reduce((acc, item) => {
    return (acc += item.actualPrice * 1);
  }, 0);
  //store cart item with user idntity
  //decorate cart item
  //option quantity
  //reducer checking while add and remove

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#fff',
        height: '100%',
      }}>
      {cartFunc.cartItems.cartItem ? (
        <>
          <FlatList
            data={cartFunc.cartItems.cartItem}
            keyExtractor={item => item.brandName}
            renderItem={({item}) => (
              <View>
                <CartItem item={item} remove={cartFunc.removeFromCart} />
              </View>
            )}
            // ListHeaderComponent={()=>(
            //     <View>
            //     <Text>Subtotal ({cartInfo.length} items) : ${price.toFixed(2)}</Text>
            //     <Button title='Proceed to Checkout'/></View>
            // )}
          />
          <Text
            style={{
              position: 'absolute',
              bottom: 10,
              left: 20,
              color: '#000',
              textAlign: 'center',
              width: '100%',
            }}>
            Total Amount : {totalPrice}
          </Text>
          <Pressable
            onPress={() => navigation.navigate('Address')}
            style={{
              position: 'absolute',
              bottom: 30,
              left: 125,
              padding: 10,
              backgroundColor: '#FFD814',
              width: 150,
              borderRadius: 5,
            }}>
            <Text style={{color: '#000', fontSize: 16, textAlign: 'center'}}>
              Checkout
            </Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({});
