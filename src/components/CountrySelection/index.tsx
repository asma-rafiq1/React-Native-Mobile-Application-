import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';

const Selection = ({heading, text, navigation}) => {
    const nextScreen = () => {
      navigation.navigate('SelectionScreen', {
        title: heading,
      });
    };
  
    const nextScreenLang = () => {
      navigation.navigate('Language-Change', {
        title: heading,
      });
    };
  
    return (
      <>
        <TouchableOpacity
          onPress={heading === 'Currency' ? undefined : heading === 'Language' ? nextScreenLang : nextScreen}
          style={styles.selectionCard}>
          <View style={{padding:13}}>
            <Text style={{color: '#000'}}>{heading}</Text>
            <Text style={styles.selectionText}>{text}</Text>
          </View>
  
          <View style={{padding:13}}>
            <Entypo name="chevron-right" size={20} color={'#b8b2b2'} />
          </View>
        </TouchableOpacity>
      </>
    );
  };
  

export default Selection

const styles = StyleSheet.create({
    selectionCard: {
        margin: 7,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#b8b2b2',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 1,
        backgroundColor: 'white',
      },
      selectionText: {
        fontWeight: '900',
        color: '#000',
      },
})