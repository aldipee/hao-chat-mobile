import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  ToastAndroid,
} from 'react-native';
import {Card, Avatar, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';

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
      allowsEditing: true,
      storageOptions: {
        waitUntilSaved: true,
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
      } else if (response.fileSize > 2048576) {
        console.log('FILE KEBESARAN');
        this.setState({upload: false});
        ToastAndroid.show('Your file size is too big', ToastAndroid.SHORT);
      } else {
        console.log(response.fileSize > 1048576, 'ASSS');
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

  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };

      xhr.onerror = function() {
        reject(new Error('Error on upload image'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
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
              uri: this.state.image.uri,
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
            <Button
              onPress={this.uploadPicture}
              title="Upload"
              loading={true}
            />
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
