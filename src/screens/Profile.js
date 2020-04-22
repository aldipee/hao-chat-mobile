import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {Avatar, Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

function ProfileScreen(props) {
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          height: 170,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Avatar
          rounded
          size="large"
          title={'AP'}
          onPress={() => console.log('aaa')}
          activeOpacity={0.7}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: '#000',
            marginTop: 10,
          }}>
          Aldi Pranata
        </Text>
      </View>
      <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
        <View style={{marginVertical: 30}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Data Diri</Text>
          <View>
            <ListItem
              containerStyle={{paddingLeft: 1}}
              title={'Email'}
              subtitle={'aldipeee@gmail.com'}
              rightTitle={'Verified'}
              rightTitleStyle={{fontSize: 11}}
              titleStyle={{fontSize: 12, color: '#000'}}
              bottomDivider
            />
            <ListItem
              containerStyle={{paddingLeft: 1}}
              title={'Nomor Handphone'}
              subtitle={'0822211111'}
              rightTitle={'Verified'}
              rightTitleStyle={{fontSize: 11}}
              titleStyle={{fontSize: 12, color: '#000'}}
              bottomDivider
            />
            <ListItem
              containerStyle={{paddingLeft: 1}}
              title={'Alamat'}
              subtitle={'Jl Suka Suka'}
              rightTitleStyle={{fontSize: 11}}
              titleStyle={{fontSize: 12, color: '#000'}}
              bottomDivider
            />
          </View>
        </View>

        <View style={{marginBottom: 20}}>
          <Button title="Logout" />
        </View>
      </View>

      <View
        style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
        <Text style={{color: '#000'}}>App Version</Text>
        <Text style={{color: '#000'}}>Beta 0.0.1</Text>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
