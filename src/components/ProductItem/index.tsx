import { Text, View,Image, Pressable} from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles from './style'
import {useNavigation} from '@react-navigation/native'

interface productsItemProps{
      item:{
          id:string,
          title:string,
          image:string,
          avgRating:number,
          ratings:number,
          price:number,
          oldPrice?:number,

      }
}

const ProductItem = (props:productsItemProps) => {
   const item=props.item;
   const navigation=useNavigation();
   const onPress=()=>{
          navigation.navigate('Home')
   }
  return (
    <Pressable onPress={onPress} style={styles.innerContainer}>
    <Image style={styles.image} source={{uri:item.image}}/>
    <View style={styles.rightContainer}>
       <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
       <View style={styles.iconContainer}>
           {/* rating */}
          {
          new Array(1,1,1,1,1).map((el,i)=>(
               <FontAwesome key={`${item.id}-${i}`} name={i<item.avgRating?"star": (item.avgRating<i && item.avgRating>(i-1)) ? 'star-half-full' : 'star-o' } size={20} color={"#e47911"}/>
          ))
          }
          
           <Text>{item.ratings}</Text>
       </View>
       <Text style={styles.price}>from {`$${item.price}`}
          {item.oldPrice && (<Text style={styles.oldPrice}> {`$${item.oldPrice}`}</Text>)}
       </Text>
    </View>
</Pressable>
  )
}

export default ProductItem