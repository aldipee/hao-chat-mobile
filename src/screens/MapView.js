import React, {Component} from 'react';
import {View, Text} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({skipPermissionRequests: true});

export default class MapView extends Component {
  componentDidMount() {
    Geolocation.getCurrentPosition(data => {
      console.log('here', data);
    });
  }
  render() {
    return (
      <View>
        <Text>Hola</Text>
      </View>
    );
  }
}
