import React, {Component} from 'react';
import {View, Text} from 'react-native';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({skipPermissionRequests: true});

export default class MapViews extends Component {
  componentDidMount() {
    Geolocation.getCurrentPosition(data => {
      this.setState();
      console.log(data.coords);
    });
  }
  render() {
    // {"accuracy": 26.87700080871582, "altitude": 0, "heading": 0, "latitude": -6.6211293, "longitude": 106.8180347, "speed": 0}
    return (
      <View>
        <Text>Hola</Text>
        <View>{/* <MapView style={{flex: 1}} showUserLocation /> */}</View>
      </View>
    );
  }
}
