import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
} from 'firebase/auth';
import {addDoc, collection, setDoc, doc} from 'firebase/firestore';
import {db} from '../../../firebase-config';
import {auth} from '../../../firebase-config';
import { useRoute } from '@react-navigation/native';
import { ModalCode } from './index2';

const RegisterScreen = ({setModal,countryCodeUser}) => {
  const [showPass, setShowPass] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const route=useRoute();
  const [registerPhone, setRegisterPhone] = useState();
 
  const [registerName, setRegisterName] = useState();
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(0);
  const navigation = useNavigation();

  const showError = (erroMsg, updaterFunc) => {
    updaterFunc(erroMsg);
    setTimeout(() => {
      updaterFunc('');
    }, 2500);
  };

  const isValidEmail = registerEmail => {
    const regex =
      /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;
    return regex.test(registerEmail);
  };

  const allFieldsFilled = () => {
    const userData = [
      registerEmail,
      registerPassword,
      registerPhone,
      registerName,
    ];
    return userData.every(value => value.trim());
  };

  //Differnence between map and every
  // Firebase store
  //Firebase login persist
  //onsnapshot
  //{/* //How to hide forsometime and only cover sspace when required */}
  //pass data from child to parent or child to child
  //Loading

  const isValidated = () => {
    if (!allFieldsFilled())
      return showError('Fill all the required fields!', setError);
    if (!registerName.trim() || registerName.length < 3)
      return showError('Invalid Name!', setError);
    if (!registerPhone.trim() || registerPhone.length < 8)
      return showError('Invalid Phone Number!', setError);
    if (!isValidEmail(registerEmail))
      return showError('Invalid Email!', setError);
    if (!registerPassword.trim() || registerPassword.length < 8)
      return showError('Invalid Password!', setError);
    return true;
  };

  // async function confirmVerificationCode(code) {
  //   try {
  //     await confirm.confirm(code);
  //     setConfirm(null);
  //   } catch (error) {
  //     Alert.alert('Invalid code');
  //   }
  // }
  const createU = async () => {
    try {
      if (isValidated()) {
        // const confirmation = await auth().signInWithPhoneNumber(registerPhone);
        // setConfirm(confirmation);
        // console.log(confirm);
        const res = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword,
        );
        const user = res.user;
        const comp = await addDoc(collection(db, 'users'), {
          uid: user.uid,
          registerName,
          registerEmail,
          registerPhone,
          countryCodePhone: countryCodeUser,
          authProvider: 'local',
        });
        navigation.navigate('BottomTabNav');
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   Firebase gives me while creating:
  //   1. email already in use
  //   2.pass needs to be 6 character long
  //   3.invalid Email
  //   4. Missing email
  //   faults: Doesnt trim and accept space

  return (
    <View style={styles.main}>
      <Text
        style={{
          color: '#a61111',
          fontWeight: '600',
          fontSize: 12,
          paddingHorizontal: 10,
        }}>
        {error}
      </Text>
      {/* //How to hide forsometime and only cover sspace when required */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={registerName}
        onChangeText={text => setRegisterName(text)}
      />
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <TouchableOpacity
          style={{...styles.input, backgroundColor: '#eee', padding: 0}}
          onPress={() => setModal(true)}>

          <View
            style={{
              flexDirection: 'row',
              width: 100,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Entypo name="select-arrows" size={15} />
            <Text style={{color: '#000', fontSize: 18, fontWeight: '700'}}>
              {countryCodeUser}
            </Text>
          </View>
        </TouchableOpacity>
        <TextInput
          style={{...styles.input, flex: 1}}
          value={registerPhone}
          placeholder="Mobile Number"
          onChangeText={text => setRegisterPhone(text)}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email(Optional)"
        value={registerEmail}
        onChangeText={text => setRegisterEmail(text)}
      />
      <View>
        <TextInput
          style={styles.input}
          secureTextEntry={showPass}
          placeholder="Set Password"
          value={registerPassword}
          onChangeText={text => setRegisterPassword(text)}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Entypo name="info" size={10} color={'#136e58'} />
        <Text style={{marginLeft: 4, color: '#000', marginTop: 3}}>
          Password must be at least 6 characters.{' '}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
          marginLeft: -8,
        }}>
        <Checkbox
          status={showPass ? 'unchecked' : 'checked'}
          onPress={() => {
            setShowPass(val => !val);
          }}
        />
        <Text style={{color: '#000'}}>Show Password</Text>
      </View>

      <Text style={{color: '#000'}}>
        By enrolling your mobile phone number, you consent to receiving
        automated security notifications via text message from Amazon. You can
        opt out by removing your mobile number on the Login & Security page
        located in Your Account settings. Message and data rates may apply.
      </Text>

      <LinearGradient
        colors={['#F3CF76', '#F0C457', '#EEB933']}
        style={{
          ...styles.pressable,
          marginVertical: 15,
          marginHorizontal: 1,
        }}>
        <Pressable style={{paddingHorizontal: 10}} onPress={createU}>
          <Text style={{fontSize: 15, color: '#000'}}>
            Verify mobile number
          </Text>
        </Pressable>
      </LinearGradient>

      <Text
        style={{
          fontSize: 10,
          color: '#000',
          textAlign: 'left',
          marginBottom: 5,
        }}>
        By creating an account or logging in, you agree to Amazon’s{' '}
        <Text style={{color: '#1e68c9'}}>Conditions of Use</Text> and{' '}
        <Text style={{color: '#1e68c9'}}>Privacy Notice.</Text>.
      </Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
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
  pressable: {
    backgroundColor: '#F0C457',
    height: 38,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#b5562d',
    borderWidth: 0.7,
    marginVertical: 8,
    borderBottomColor: '#000',
    marginHorizontal: 10,
  },
  main: {
    paddingHorizontal: 10,
  },
});
