import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Divider, Image} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import RegisterScreen from '../../components/SelectLoginRegister';
import { useNavigation } from '@react-navigation/native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from 'firebase/auth';

import {auth} from '../../../firebase-config';
import {addDoc, collection, setDoc, doc} from 'firebase/firestore';
import {db} from '../../../firebase-config';
// import auth from '@react-native-firebase/auth';
import {ModalCode} from '../../components/SelectLoginRegister/index2';

const SelectLoginRegister = ({countryCodeUser}) => {
  const [registerPhoneCode, setRegisterPhoneCode] = useState(countryCodeUser);
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(true);
  const [modal, setModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  //mobile digit depend
  //textinput one comp
  //keyboard problem
  //design error
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(0);
  const navigation=useNavigation();

  const showError = (erroMsg, updaterFunc) => {
    updaterFunc(erroMsg);
    setTimeout(() => {
      updaterFunc('');
    }, 2500);
  };

  const isValidEmail = loginEmail => {
    const regex =
      /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;
    return regex.test(loginEmail);
  };

  const allFieldsFilled = () => {
    const userData = [loginEmail, loginPass];
    return userData.every(value => value.trim());
  };
  const isValidated = () => {
    if (!allFieldsFilled())
      return showError('Fill all the required fields!', setError);
    if (!isValidEmail(loginEmail)) return showError('Invalid Email!', setError);
    if (!loginPass.trim() || loginPass.length < 8)
      return showError('Invalid Password!', setError);
    return true;
  };

  const createU = async () => {
    try {
      if (isValidated()) {
        const res = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPass,
        );
        navigation.navigate('BottomTabNav')
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //   Firebase gives me while Login:
  //   1. by email user not found
  //   2. wrong password
  //   3. invalid Email
  //   4. Missing email
  //   faults: Doesnt trim and accept space

  return (
    <View style={modal && {opacity: 0, backgroundColor: '#eee'}}>
      <View style={styles.imageParent}>
        <Image
          source={require('../../assets/images/amazonLogo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.secItem}>
        <Text style={styles.text}>Welcome</Text>
        <View style={styles.secItemChild}>
          <View style={styles.nestedChild}>
            <View>
              <View style={styles.radios}>
                <RadioButton
                  value="create"
                  color="#cf421f"
                  status={active ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setActive(true);
                    setActive2(false);
                  }}
                />
                <Text style={styles.textColor}>
                  Create account.{' '}
                  <Text style={{fontSize: 11, fontWeight: 'normal'}}>
                    New to Amazon?
                  </Text>
                </Text>
              </View>
              {active && (
                <RegisterScreen
                  setModal={setModal}
                  countryCodeUser={countryCodeUser}
                 
                />
              )}
            </View>

            <View style={styles.radio}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="signin"
                  color="#cf421f"
                  status={active2 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setActive2(true);
                    setActive(false);
                  }}
                />
                <Text style={styles.textColor}>
                  Sign-In.{' '}
                  <Text style={{fontSize: 11, fontWeight: 'normal'}}>
                    Already a customer?
                  </Text>
                </Text>
              </View>
              {active2 && (
                <View>
                  <Text
                    style={{
                      color: '#a61111',
                      fontWeight: '600',
                      fontSize: 12,
                      paddingHorizontal: 10,
                    }}>
                    {error}
                  </Text>
                  <View style={{padding: 10}}>
                    <TextInput
                      placeholder="Email or phone number"
                      selectionColor="#000"
                      style={{...styles.input, marginVertical: 2}}
                      value={loginEmail}
                      onChangeText={setLoginEmail}
                    />
                  </View>
                  <View style={{padding: 10}}>
                    <TextInput
                      placeholder="Password"
                      selectionColor="#000"
                      value={loginPass}
                      style={{...styles.input, marginVertical: 2}}
                      onChangeText={setLoginPass}
                    />
                  </View>
                  <LinearGradient
                    colors={['#F3CF76', '#F0C457', '#EEB933']}
                    style={styles.pressable}>
                    <Pressable
                      style={{paddingHorizontal: 20}}
                      onPress={createU}>
                      <Text style={{fontSize: 15, color: '#000'}}>
                        Continue
                      </Text>
                    </Pressable>
                  </LinearGradient>

                  <Text
                    style={{
                      fontSize: 10,
                      color: '#000',
                      textAlign: 'left',
                      marginVertical: 9,
                      marginLeft: 10,
                    }}>
                    By continuing, you agree to Amazon's{' '}
                    <Text style={{color: '#1e68c9'}}>Conditions of Use</Text>{' '}
                    and <Text style={{color: '#1e68c9'}}>Privacy Notice.</Text>
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      <View>
        <Divider
          width={0.4}
          inset={true}
          insetType={'middle'}
          style={{elevation: 2, marginVertical: 30}}
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text style={{color: '#1e68c9', marginRight: 15}}>
            Conditions of Use
          </Text>
          <Text style={{color: '#1e68c9', marginRight: 15}}>
            Privacy Notice
          </Text>
          <Text style={{color: '#1e68c9', marginRight: 15}}>Help</Text>
        </View>
        <Text style={{fontSize: 10, color: '#000'}}>
          {' '}
          © 1996-2022, Amazon.com, Inc. or its affiliates
        </Text>
      </View>

      {modal && (
        <ModalCode
          setModal={setModal}
          modal={modal}
          setRegisterPhoneCode={setRegisterPhoneCode}
        />
      )}
    </View>
  );
};

export default SelectLoginRegister;

const styles = StyleSheet.create({
  logo: {
    position: 'relative',
    top: 15,
    height: 20,
    width: 100,
    resizeMode: 'cover',
    zIndex: 3,
  },
  imageParent: {
    backgroundColor: '#f2f5f7',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1.5,
  },
  secItem: {
    padding: 15,
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  secItemChild: {
    borderWidth: 0.7,
    borderColor: '#bec0c2',
    marginTop: 10,
    borderRadius: 8,
  },
  nestedChild: {},
  radio: {
    borderWidth: 0.4,
    borderColor: '#bec0c2',
    padding: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  radios: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
    padding: 5,
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
  main: {
    paddingHorizontal: 10,
  },
});

//onchangetext not working as register screen inside selectloginregister so rerender on condition active?
