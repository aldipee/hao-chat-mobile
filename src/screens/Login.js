import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {connect} from 'react-redux';
import {setLogin} from '../redux/actions/AuthAction';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    console.log(user);
  });

  const onSubmit = () => {
    props.setLogin(email, password, success => {
      if (success) {
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
      <Text style={{fontSize: 26, paddingHorizontal: 10, fontWeight: 'bold'}}>
        Welcome Back!
      </Text>
      <Text
        style={{
          fontSize: 19,
          paddingHorizontal: 10,
          marginBottom: 40,
          color: '#d1d1d1',
        }}>
        Ready to talk?
      </Text>
      <View>
        <Input
          placeholder="Email"
          leftIcon={<Icon name="md-person" size={24} color="#000" />}
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
          label="Email"
          labelStyle={{fontSize: 13, marginBottom: 4}}
        />
        <Input
          placeholder="Password"
          containerStyle={{marginTop: 18}}
          leftIcon={<Icon name="md-lock" size={24} color="#000" />}
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
          label="Password"
          labelStyle={{fontSize: 13, marginBottom: 4}}
        />

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

export default connect(
  null,
  {setLogin},
)(Login);
