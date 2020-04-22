import React from 'react';
import {View, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Register(props) {
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
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderRadius: 3,
            borderColor: '#d1d1d1',
          }}
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
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderRadius: 3,
            borderColor: '#d1d1d1',
          }}
          label="Phone Number"
          labelStyle={{fontSize: 13, marginBottom: 4}}
        />
        <View>
          <Button
            type="outline"
            title="Register"
            buttonStyle={{backgroundColor: '#000'}}
            titleStyle={{fontSize: 14, color: '#fff'}}
            containerStyle={{marginTop: 15, paddingHorizontal: 10}}
          />
        </View>
      </View>
    </View>
  );
}
