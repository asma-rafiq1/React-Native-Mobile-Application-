import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ButtonProps{
    text:string,
    onPress:()=>void
}

const Button = ({text,onPress}) => {
  return (
    
    <Pressable style={styles.root} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    root:{
        backgroundColor:'#FFD814',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        margin:7,
        marginTop:16,
        borderRadius:10,
        elevation:2,
        width:100,
        width:'95%'
    },
    text:{
        fontSize:16,
        color:'black',
        padding:6,
    }
})