import React, {useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, View, ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {setLogout} from '../redux/actions/AuthAction';
import {TouchableOpacity} from 'react-native-gesture-handler';

function ProfileScreen(props) {
  useFocusEffect(
    useCallback(() => {
      if (props.route.params.uri) {
        ToastAndroid.show('Profile Picture update!', ToastAndroid.SHORT);
      }
    }, []),
  );
  const onLogout = () => {
    props.setLogout();
    props.navigation.navigate('Home');
  };
  useEffect(() => {}, []);
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
          source={{
            uri: props.route.params.uri
              ? props.route.params.uri
              : props.route.params.photo,
          }}
          onPress={() =>
            props.navigation.navigate('UploadImage', props.route.params)
          }
          activeOpacity={0.7}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: '#000',
            marginTop: 10,
          }}>
          {props.route.params.name}
        </Text>
      </View>
      <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
        <View style={{marginVertical: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Data Diri</Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('EditData', {
                  data: props.route.params,
                })
              }>
              <Text style={{fontSize: 14}}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View>
            <ListItem
              containerStyle={{paddingLeft: 1}}
              title={'Email'}
              subtitle={props.route.params.email}
              rightTitleStyle={{fontSize: 11}}
              titleStyle={{fontSize: 12, color: '#000'}}
              bottomDivider
            />

            <ListItem
              containerStyle={{paddingLeft: 1}}
              title={'Phone Number'}
              subtitle={props.route.params.phoneNumber}
              rightTitleStyle={{fontSize: 11}}
              titleStyle={{fontSize: 12, color: '#000'}}
              bottomDivider
            />
          </View>
        </View>

        <View style={{marginBottom: 20}}>
          <Button title="Logout" onPress={onLogout} />
        </View>
      </View>

      <View
        style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
        <Text style={{color: '#a8a8a8'}}>App Version</Text>
        <Text style={{color: '#a8a8a8'}}>Beta 0.0.1</Text>
      </View>
    </ScrollView>
  );
}

export default connect(
  null,
  {setLogout},
)(ProfileScreen);
