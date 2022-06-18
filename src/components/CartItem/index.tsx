import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import QuantitySelector from '../QuantitySelector';
import Button from '../Button';

const CartItem = ({item,remove}) => {
  const [Quantity, setQuantity] = React.useState(1)


  return (
    <View style={styles.root}>
      {item ? (
        <>
          <Image source={{uri: item.variety[0].images[0]}} style={styles.image} />
          <View style={{marginLeft:20,marginTop:10}}>
            <Text style={{color: '#000',fontSize:20}}>{item.brandName}</Text>
            <Text style={{color: '#000',fontSize:15}} >OMR {item.actualPrice}</Text>
            
            {/* Options you selected in product item */}
            <Text style={{fontSize:10,marginTop:10}}>Conditions Apply</Text>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:10}}>
              <QuantitySelector quantity={Quantity} setQuantity={setQuantity}/>
              <Pressable
            onPress={() => remove(item)}
            style={{
              
              backgroundColor: '#FFD814',
              borderRadius: 5,
              padding:5
            }}>
            <Text style={{color: '#000', fontSize: 16, textAlign: 'center'}}>
              Remove
            </Text>
          </Pressable>
            </View>
          </View>
        </>
      ) :null}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderColor:'#f8f8f8',
    borderRadius:5,
    borderWidth:1.7,
    marginVertical:10,
    
  },
  image: {
    height: 130,
    width: 100,
    resizeMode:'cover'

  },
});
