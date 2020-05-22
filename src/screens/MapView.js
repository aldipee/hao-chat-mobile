import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Card, Button} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {getSingleData} from '../redux/actions/AuthAction';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

const Style = StyleSheet.create({
  container: {
    height: 400,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({skipPermissionRequests: true});

class MapViews extends Component {
  state = {
    coords: {},
  };
  componentWillMount() {
    Geolocation.getCurrentPosition(
      data => {
        this.setState({
          coords: data.coords,
        });
      },
      err => {
        console.log(err);
      },
    );
    Geolocation.watchPosition(
      data => {
        console.log(data, ' THIS IS WATCHPOSITION');
        this.setState({
          coords: data.coords,
        });
      },
      null,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
        distanceFilter: 1,
      },
    );
  }
  render() {
    // {"accuracy": 26.87700080871582, "altitude": 0, "heading": 0, "latitude": -6.6211293, "longitude": 106.8180347, "speed": 0}
    return (
      <View>
        <View style={Style.container}>
          {this.state.coords && (
            <MapView
              provider={PROVIDER_GOOGLE}
              followsUserLocation={true}
              showsMyLocationButton={true}
              loadingEnabled={true}
              minZoomLevel={15}
              showsUserLocation
              style={Style.map}
              initialRegion={{
                latitude: this.props.currentUser.data.location.latitude,
                longitude: this.props.currentUser.data.location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <MapView.Marker
                title={this.props.route.params.name}
                description={`${
                  this.props.route.params.name
                }'s current position`}
                coordinate={{
                  latitude: this.props.route.params.location.latitude,
                  longitude: this.props.route.params.location.longitude,
                }}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={{uri: this.props.route.params.photo}}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 30,
                      borderWidth: 2,
                      borderColor: '#fff',
                    }}
                  />
                  <Icon
                    name="location-on"
                    style={{
                      zIndex: -1,
                      color: '#0f95f5',
                      fontSize: 65,
                      marginTop: -42,
                    }}
                  />
                </View>
              </MapView.Marker>
            </MapView>
          )}
        </View>
        <View>
          <Card>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {this.props.route.params.name}
              </Text>
              <Text>{this.props.route.params.email}</Text>
              <Text>{this.props.route.params.phoneNumber}</Text>
            </View>
          </Card>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.authData,
  };
};

export default connect(
  mapStateToProps,
  {getSingleData},
)(MapViews);
