import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Platform} from 'react-native';
import {Card, Avatar, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {setNewPicutre} from '../redux/actions/AuthAction';

class UploadImage extends Component {
  state = {
    uri: '',
    upload: true,
    image: {
      uri: this.props.route.params.photo,
    },
  };
  //Handle Choose Picture
  choosePicture = () => {
    var options = {
      quality: 0.7,
      allowsEditing: true,
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        skipBackup: true,
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

  uriToBlob = uri => {
    console.log('URI', uri);
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
    try {
      const file = await this.uriToBlob(this.state.image.uri);
      console.log('mulai upload', file);
      storage()
        .ref(`profile/${this.props.route.params.uid}.png`)
        .put(file)
        .then(async () => {
          const url = await storage()
            .ref(`profile/${this.props.route.params.uid}.png`)
            .getDownloadURL();
          this.updateUserImage(url);
        })
        .catch(err => {
          console.log({err}, 'ERROR IN UPLOAD IMAGEPICKER');
        });
    } catch (error) {
      console.log({error});
    }
  };

  updateUserImage = async imageUrl => {
    try {
      const id = this.props.route.params.uid;

      database()
        .ref(`UsersList/${id}`)
        .child('photo')
        .set(imageUrl)
        .then(() => {
          this.props.setNewPicutre(imageUrl);
          this.props.navigation.goBack();
        })
        .catch(err => {
          console.log({err}, 'ERROR PAS');
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ScrollView>
        {/* Avatar and Picture */}
        <View
          style={{
            marginTop: 30,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: 190,
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Avatar
            rounded
            size="xlarge"
            onPress={this.choosePicture}
            activeOpacity={0.7}
            source={{
              uri: this.state.image.uri,
            }}
          />

          <Text
            style={{
              backgroundColor: '#cfcfcf',
              color: '#fff',
              padding: 10,
              marginTop: 20,
              borderRadius: 5,
            }}>
            Upload your picture with .jpg/.png/.jpeg extension. Max file size
            2Mb
          </Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          {/* Balance Info */}

          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Button
              buttonStyle={{paddingHorizontal: 20}}
              onPress={this.uploadPicture}
              title="Upload"
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

export default connect(
  null,
  {setNewPicutre},
)(UploadImage);
