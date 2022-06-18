import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductCard from '../../components/ProductCard'
import { useRoute } from '@react-navigation/native'

const ProductsScreen = () => {
  const route=useRoute();
  const category=route.params.category;
  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
    <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',alignItems:'center',marginVertical:10}}>
      {category.map((item,index)=>{
        return(
        <View key={index}>
            <ProductCard item={item}/>
        </View>)
      })}
    </View></ScrollView>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({})