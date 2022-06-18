import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const QuantitySelector = ({quantity,setQuantity}) => {

   
    const onMinus=()=>{
        // max value between 0 and -1 is 0
           setQuantity(Math.max(1,quantity-1));     
    }

    const onPlus=()=>{
        setQuantity(quantity+1);
    }
  return (
    <View style={styles.root}>
       <Pressable style={styles.button} onPress={onMinus}>
           <Text style={styles.text}>-</Text>
       </Pressable>
       <Text style={styles.quantity}>{quantity}</Text>
       <Pressable style={styles.button} onPress={onPlus}>
       <Text style={styles.text}>+</Text>
       </Pressable>
    </View>
  )
}

export default QuantitySelector

const styles=StyleSheet.create({
    root:{
        flexDirection:'row',
        alignItems:'center',
        borderWidth:.5,
        borderColor:'#e3e3e3',
        borderRadius:3,
        justifyContent:"space-around",
        width:70,
        height:30,
        marginRight:30
    },
    button:{
       backgroundColor:"#eee",
       width:30,
       height:'100%',
       flexDirection:'row',
       justifyContent:'center',
       alignItems:"center",
       flex:1

    },
    text:{
        fontSize:20,
        color:"blue",
        
    },
    quantity:{
        fontSize:13,
        padding:5
    }
})

