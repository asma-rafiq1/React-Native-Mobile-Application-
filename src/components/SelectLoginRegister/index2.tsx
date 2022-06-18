import {FlatList, StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import {Divider} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import React, {useState} from 'react';
import CountriesInfo from '../../data/country';

export const ModalCode = ({setRegisterPhoneCode, setModal, modal}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModal(!modal);
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          marginVertical:25
        }}>
        <View style={{width: 150}}>
          <View
            style={{
              ...styles.input,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginHorizontal: 0,
              marginVertical: 0,
              borderRadius: 0,
              backgroundColor: '#eee',
            }}>
            <Text style={{...styles.textColor, fontSize: 10}}>
              Country/Region code
            </Text>
            <Entypo
              onPress={() => setModal(false)}
              style={{marginLeft: 15}}
              name="cross"
              size={15}
            />
          </View>

          <FlatList
            data={CountriesInfo}
            renderItem={({item}) => (
              <>
                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 15,
                    backgroundColor: '#fff',
                  }}
                  onPress={() => {
                    setRegisterPhoneCode(item.phone);
                    setModal(false);
                  }}>
                  <Text>{item.name}</Text>
                  <Text style={{marginLeft: 15}}>{item.phone}</Text>
                </Pressable>
                <Divider width={0.5} />
              </>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textColor: {
    color: '#000',
    fontWeight: '900',
  },
  input: {
    height: 45,
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 0.2,
    borderRadius: 5,
    marginVertical: 6,
    padding: 10,
    fontSize: 13,
    marginHorizontal: 4,
    elevation: 2,
    borderColor: '#fff',
  },
});
