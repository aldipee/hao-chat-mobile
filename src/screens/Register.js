import React, {useState, useEffect} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({skipPermissionRequests: true});

// Redux
import {connect} from 'react-redux';
import {insertNewUser} from '../redux/actions/AuthAction';

function Register(props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkemail = () => {
    let req = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(req.test(email));
    if (!req.test(email)) {
      setErrorMessage('Email is invalid!');
    } else {
      setErrorMessage(null);
    }
  };

  const checkPhone = () => {
    let req = /^(^\+62\s?|^0)(\d{3,4}?){2}\d{3,4}$/;
    console.log(req.test(phoneNumber));
    if (!req.test(phoneNumber)) {
      setPhoneNumberError('Phone number is invalid');
    } else {
      setPhoneNumberError(null);
    }
  };

  useEffect(() => {
    const user = auth().currentUser;
    console.log('FUC', user);
    Geolocation.getCurrentPosition(
      data => {
        setLocation(data.coords);
      },
      err => {
        console.log(err);
      },
    );
  }, []);

  const onSubmit = async () => {
    const data = {fullName, email, phoneNumber, password};
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth().onAuthStateChanged(userData => {
          if (userData) {
            database()
              .ref('UsersList/' + userData.uid)
              .set({
                name: fullName,
                status: 'online',
                email: email,
                photo:
                  'https://cdn2.iconfinder.com/data/icons/men-women-from-all-over-the-world-1/93/man-woman-people-person-avatar-face-user_49-512.png',
                uid: userData.uid,
                phoneNumber,
                location,
              })
              .then(() => {
                ToastAndroid.show(
                  'Register success, please login to countinue!',
                  ToastAndroid.SHORT,
                );
                props.navigation.navigate('_Login');
                auth().signOut();
              })
              .catch(error => console.log(error.message));
          }
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setLoading(false);
          ToastAndroid.show(
            'That email address is already in use!',
            ToastAndroid.SHORT,
          );
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
      }}>
      <Text style={{fontSize: 20, paddingHorizontal: 10, fontWeight: 'bold'}}>
        We Provide The Best Service
      </Text>
      <Text
        style={{
          fontSize: 15,
          paddingHorizontal: 10,
          marginBottom: 40,
          color: '#d1d1d1',
        }}>
        Join us! You won't regret
      </Text>
      <View>
        <Input
          placeholder="Ex : John Doe"
          leftIcon={<Icon name="md-person" size={24} color="#000" />}
          inputStyle={{fontSize: 15, paddingBottom: 5}}
          containerStyle={{marginVertical: 10}}
          leftIconContainerStyle={{
            marginLeft: 10,
            marginRight: 10,
            paddingBottom: 0,
          }}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderRadius: 3,
            borderColor: '#d1d1d1',
          }}
          onChangeText={text => setFullName(text)}
          label="Full Name"
          labelStyle={{fontSize: 13, marginBottom: 4}}
        />
        <Input
          placeholder="Ex: johndoe@gmail.com"
          leftIcon={<Icon name="ios-mail" size={24} color="#000" />}
          containerStyle={{marginVertical: 10}}
          inputStyle={{fontSize: 15, paddingBottom: 5}}
          leftIconContainerStyle={{
            marginLeft: 10,
            marginRight: 10,
            paddingBottom: 0,
          }}
          onBlur={() => checkemail()}
          onChangeText={text => setEmail(text)}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderRadius: 3,
            borderColor: '#d1d1d1',
          }}
          errorMessage={errorMessage ? errorMessage : null}
          label="Email"
          labelStyle={{fontSize: 13, marginBottom: 4}}
        />
        <Input
          placeholder="Your phone number"
          leftIcon={<Icon name="md-call" size={24} color="#000" />}
          inputStyle={{fontSize: 15, paddingBottom: 5}}
          containerStyle={{marginVertical: 10}}
          leftIconContainerStyle={{
            marginLeft: 10,
            marginRight: 10,
            paddingBottom: 0,
          }}
          onBlur={() => checkPhone()}
          onChangeText={text => setPhoneNumber(text)}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderRadius: 3,
            borderColor: '#d1d1d1',
          }}
          label="Phone Number"
          errorMessage={phoneNumberError ? phoneNumberError : null}
          labelStyle={{fontSize: 13, marginBottom: 4}}
        />
        <Input
          placeholder="Your Passwrod"
          leftIcon={<Icon name="md-lock" size={24} color="#000" />}
          inputStyle={{fontSize: 15, paddingBottom: 5}}
          containerStyle={{marginVertical: 10}}
          leftIconContainerStyle={{
            marginLeft: 10,
            marginRight: 10,
            paddingBottom: 0,
          }}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderRadius: 3,
            borderColor: '#d1d1d1',
          }}
          label="Password"
          onChangeText={text => setPassword(text)}
          labelStyle={{fontSize: 13, marginBottom: 4}}
        />

        <View>
          <Button
            onPress={onSubmit}
            type="outline"
            loading={loading}
            disabled={password === '' ? true : null}
            title="Register"
            buttonStyle={{backgroundColor: '#000'}}
            titleStyle={{fontSize: 14, color: '#fff'}}
            containerStyle={{marginTop: 15, paddingHorizontal: 10}}
          />
          <Button
            onPress={() => props.navigation.navigate('_Login')}
            type="outline"
            title="Login"
            buttonStyle={{backgroundColor: '#000'}}
            titleStyle={{fontSize: 14, color: '#fff'}}
            containerStyle={{marginTop: 15, paddingHorizontal: 10}}
          />
        </View>
      </View>
    </View>
  );
}

export default connect(
  null,
  {insertNewUser},
)(Register);
