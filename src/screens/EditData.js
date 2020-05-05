import React, {useState, useEffect} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({skipPermissionRequests: true});

// Redux
import {connect} from 'react-redux';
import {insertNewUser} from '../redux/actions/AuthAction';

function Edit(props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);

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
    setFullName(props.route.params.data.name);
    setEmail(props.route.params.data.email);
    setPhoneNumber(props.route.params.data.phoneNumber);
  }, []);

  const onSubmit = () => {
    const uid = '';
    database()
      .ref(`UsersList/${uid}`)
      .update({
        email,
        name: fullName,
        phoneNumber,
      })
      .then(() => {
        props.navigation.goBack();
        ToastAndroid.show('Data updated!', ToastAndroid.SHORT);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
      }}>
      <View style={{marginTop: 30}}>
        <Input
          placeholder="Ex : John Doe"
          leftIcon={<Icon name="md-person" size={24} color="#000" />}
          inputStyle={{fontSize: 15, paddingBottom: 5}}
          containerStyle={{marginVertical: 10}}
          value={fullName}
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
          value={email}
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
          value={phoneNumber}
          label="Phone Number"
          errorMessage={phoneNumberError ? phoneNumberError : null}
          labelStyle={{fontSize: 13, marginBottom: 4}}
        />

        <View>
          <Button
            onPress={onSubmit}
            type="outline"
            title="Edit "
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
)(Edit);
