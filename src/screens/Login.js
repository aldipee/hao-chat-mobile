import React, {useState} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        auth().onAuthStateChanged(userData => {
          const id = userData._user.uid;
          database()
            .ref(`/UserList/${id}`)
            .once('value')
            .then(snapshot => {
              props.navigation.navigate('Home', snapshot.val());
              console.log('User data: ', snapshot.val());
            });
        });
      })
      .catch(err => {
        console.log(err.code);
        if (err.code === 'auth/wrong-password') {
          ToastAndroid.show('Wrong Password', ToastAndroid.SHORT);
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
      <View>
        <Input
          placeholder="Email"
          leftIcon={<Icon name="md-call" size={24} color="#000" />}
          inputStyle={{fontSize: 15, paddingBottom: 5}}
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
          onChangeText={text => setEmail(text)}
          label="Phone Number"
          labelStyle={{fontSize: 13, marginBottom: 4}}
        />
        <Input
          placeholder="Password"
          leftIcon={<Icon name="md-call" size={24} color="#000" />}
          inputStyle={{fontSize: 15, paddingBottom: 5}}
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
          onChangeText={text => setPassword(text)}
          label="Phone Number"
          labelStyle={{fontSize: 13, marginBottom: 4}}
        />
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text>Register</Text>
        </TouchableOpacity>
        <View>
          <Button
            type="outline"
            onPress={onSubmit}
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