import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const InputElement
 = ({text,textChange,inputDetails,placeholder}) => {
  return (
    <View style={{marginTop:10}}>
    <Text style={{color:'#000',fontSize:15,marginBottom:7}}>{text}</Text>
    <TextInput placeholder={placeholder} style={{backgroundColor:'#fff', borderRadius:2,height:38,borderColor:'#000',borderWidth:.7,paddingHorizontal:20}} onChangeText={textChange} value={inputDetails} />
</View>
  )
}

export default InputElement


const styles = StyleSheet.create({})