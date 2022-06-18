import {BackHandler, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import * as RNLocalize from 'react-native-localize';
import {useNavigation} from '@react-navigation/native';
import Selection from '../../components/CountrySelection';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountrySelection = ({SelectedItem}) => {
  const navigation = useNavigation();
  const [userCountryName, setusercountryName] = useState();

  const {name, currency} = SelectedItem;

  //Method 2 to get country name
  //   const country = RNLocalize.getTimeZone();
  //   const currentCity = country.substring(5);

  //Method 1 to get country Currency Name and Symbol

  let currencySymbol = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  })
    .format(0)
    .toString()
    .slice(0, 1);

  let currencyName = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'name',
    minimumFractionDigits: 0,
  })
    .format(1)
    .toString()
    .slice(1); //0 sa start - wala nikalta hai

  let userCurrency = currencySymbol.concat(currencyName);

  //another method to get country currency and symbol
  // let newCurrency = text.toLocaleString("ar-EG", {style:"currency", currency:'USD',currencyDisplay:'symbol'});

  const nextScreen = async () => {
    await AsyncStorage.multiSet([
      ['userSelectedCountry', SelectedItem.name],
      ['userSelectedLang', SelectedItem.selectedLang],
    ]);
    await AsyncStorage.multiGet(
      ['userSelectedCountry', 'userSelectedLang'],
      (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = result[0];
          let value = result[1];
        });
      },
    );
    
    navigation.navigate('UserAccount',{countryCodeUser:SelectedItem.phone});
  };

 

  React.useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => setusercountryName(data.country_name))
      .catch(error => console.log(error)); //response & data?
  }, []);

  return (
    <View style={styles.root}>
      <Entypo
        name="cross"
        size={25}
        color={'#000'}
        style={styles.crossIcon}
        onPress={nextScreen}
      />

      <View style={styles.mapAndText}>
        <Image
          source={require('../../assets/images/map.png')}
          style={{height: 130, width: 240, resizeMode: 'contain'}}
        />
        <View style={styles.mapAndText2}>
          <Text
            style={
              styles.text
            }>{`You are shopping for Amazon.com(US) items shipping to ${userCountryName}`}</Text>
          <Text style={styles.text}>
            Which language and currency do you want to shop in?
          </Text>
        </View>
      </View>

      <View style={styles.comp2}>
        <Selection
          navigation={navigation}
          heading={'Country/Region'}
          text={name}
        />

        <Selection
          navigation={navigation}
          heading={'Language'}
          text={SelectedItem.selectedLang}
        />
        {SelectedItem.name === 'United States' && (
          <Selection
            navigation={navigation}
            heading={'Currency'}
            text={userCurrency}
          />
        )}
        <Button text={'Done'} onPress={nextScreen} />
      </View>
    </View>
  );
};

export default CountrySelection;

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  mapAndText: {
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 4,
    color: '#000',
  },
  mapAndText2: {
    marginTop: 15,
  },
  crossIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  comp2: {
    marginTop: 10,
  },
});
