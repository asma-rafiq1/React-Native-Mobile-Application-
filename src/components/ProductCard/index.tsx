import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'
import { Rating } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const ProductCard = ({item}) => {

  const navigation=useNavigation()

  const productDetail=()=>{
          navigation.navigate('ProductDetailScreen',{item:item})
          console.log('pressed')
  }
  
  return (
    <Pressable style={{width:165,marginVertical:10,borderRadius:6,borderColor:'#eee',borderWidth:1}} onPress={productDetail}>
     <Image source={{uri:item.variety[0].images[0]}} style={{width:165,height:200,resizeMode:'contain'}}/>
     <View style={{backgroundColor:'#fff',justifyContent:'space-around',height:110,padding:5,borderColor:'#eee',borderTopWidth:.8}}>
         <Text style={{color:'#000',alignContent:'center',fontWeight:'700',textAlign:'center'}}>{item.brandName}</Text>
         <Text numberOfLines={2} style={{color:'#000',fontSize:10}}>{item.productShortDescription}</Text>
         <Rating imageSize={12} ratingCount={5}  readOnly startingValue={4.2} ratingColor='#4494bd'/>
         <Text style={{fontWeight:'700',color:'#a61111',fontSize:18,textAlign:'center'}}> {item.actualPrice} <Text style={{textDecorationLine:'line-through',color:'#000',fontSize:12}}>$999</Text> <Text style={{color:'#000',fontSize:12}}>{`(${item.discountPercent} off)`}</Text></Text>
         <Text style={{color:'#000',fontSize:10,textAlign:'center'}}>Free Delivery on first order.</Text>
     </View>
    </Pressable>


//dont want all description to be written
  )
}

export default ProductCard

const styles = StyleSheet.create({})