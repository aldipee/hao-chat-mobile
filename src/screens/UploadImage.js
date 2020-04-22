import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Platform} from 'react-native';
import {Card, Avatar, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';

class UploadImage extends Component {
  state = {
    uri: '',
    upload: true,
    image: '',
  };
  //Handle Choose Picture
  choosePicture = () => {
    var options = {
      quality: 0.7,
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        path: 'images',
        cameraRoll: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.fileName);
        this.setState({
          upload: true,
          image: {
            name: response.fileName,
            type: response.type,
            size: response.fileSize,
            uri:
              Platform.OS === 'android'
                ? response.uri
                : response.uri.replace('file://', ''),
          },
        });
      }
    });
  };
  uploadPicture = async () => {
    console.log('mulai upload');
  };

  render() {
    return (
      <ScrollView>
        {/* Avatar and Picture */}
        <View
          style={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: 190,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Avatar
            rounded
            size="xlarge"
            title="AP"
            onPress={this.choosePicture}
            activeOpacity={0.7}
            source={{
              uri: '',
            }}
          />

          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',

              marginTop: 10,
            }}>
            Abi Daniela
          </Text>
        </View>
        <View style={{paddingHorizontal: 10, backgroundColor: '#fff'}}>
          {/* Balance Info */}

          <View style={{marginBottom: 20}}>
            <Button onPress={this.uploadPicture} title="Upload" />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const localStyle = StyleSheet.create({
  iconBox: {
    width: 73,
    alignItems: 'center',
    padding: 5,
  },
  iconDesc: {fontSize: 11, alignItems: 'center'},
});

export default UploadImage;
