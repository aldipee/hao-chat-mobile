import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Avatar, Image} from 'react-native-elements';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import SortData from 'sort-objects-array';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';

class Rooms extends Component {
  state = {
    currentUser: this.props.userData.uid,
    userSelected: this.props.route.params.data.uid,
    messages: [],
    messageList: [],
    showModal: false,
  };

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  componentDidMount() {
    database()
      .ref('message/')
      .child(`/${this.state.currentUser}/`)
      .child(`/${this.state.userSelected}/`)

      .on('child_added', value => {
        this.setState(prevState => {
          const data = value.val();
          const res = [...prevState.messages, value.val()];
          const d = res.map((data, index) => {
            data._id = 1 + index;
            data.user = {
              _id: data.from === this.state.currentUser ? 1 : 2,
              avatar:
                data.from !== this.state.currentUser
                  ? this.props.route.params.data.photo
                  : null,
            };
            return data;
          });

          return {
            messages: SortData(d, 'createdAt', 'desc'),
          };
        });
      });

    // database()
    //   .ref(`message/${this.state.currentUser}/${this.state.userSelected}/`).on('value').then((value) =>{

    //   })
    //   .on('child_added', value => {
    //     this.setState(prevState => {
    //       const data = value.val();
    //       const res = [...prevState.messages, value.val()];
    //       const d = res.map((data, index) => {
    //         data.text = data.message;
    //         data._id = index;
    //         data.createdAt = data.time;
    //         data.user = {
    //           _id: data.from === this.state.currentUser ? 1 : 2,
    //           avatar:
    //             data.from !== this.state.currentUser
    //               ? this.props.route.params.data.photo
    //               : null,
    //         };
    //         return data;
    //       });
    //       console.log(d, 'CEEr');
    //       return {
    //         messages: d.reverse(),
    //       };
    //     });
    //   });

    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ],
    // });
  }

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

  handleAddPicture = () => {
    const options = {
      title: 'Select Profile Pic',
      mediaType: 'photo',
      takePhotoButtonTitle: 'Take a Photo',

      allowsEditing: true,
      noData: true,
    };
    ImagePicker.showImagePicker(options, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        // do nothing
      } else if (response.error) {
        // alert error
      } else {
        const {uri} = response;
        const extensionIndex = uri.lastIndexOf('.');
        const extension = uri.slice(extensionIndex + 1);
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const correspondingMime = ['image/jpeg', 'image/jpeg', 'image/png'];

        const blobImage = await this.uriToBlob(uri);
        storage()
          .ref(`profile/${this.props.route.params.uid}.png`)
          .put(blobImage)
          .then(async () => {
            const url = await storage()
              .ref(`profile/${this.props.route.params.uid}.png`)
              .getDownloadURL();
            const dataMessage = {
              text: '',
              createdAt: database.ServerValue.TIMESTAMP,
              from: this.state.currentUser,
              image: url,
            };
            try {
              let messageId = (await database()
                .ref(`message/`)
                .child(`/${this.state.currentUser}/`)
                .child(`/${this.state.userSelected}`)
                .push()).key;
              let updates = {};

              updates[
                `message/${this.state.currentUser}/${
                  this.state.userSelected
                }/${messageId}`
              ] = dataMessage;
              updates[
                `message/${this.state.userSelected}/${
                  this.state.currentUser
                }/${messageId}`
              ] = dataMessage;
              database()
                .ref()
                .update(updates, () => {
                  this.setState({textMessage: ''});
                });
            } catch (error) {
              console.log('This error from chat', error);
            }
          })
          .catch(err => {
            console.log({err}, 'ERROR IN UPLOAD IMAGEPICKER');
          });

        if (!allowedExtensions.includes(extension)) {
          return alert('That file type is not allowed.');
        }
      }
    });
  };

  showProfile = () => {};
  onSend(messages = []) {
    this.setState(
      previousState => ({}),
      async () => {
        if (messages) {
          try {
            let messageId = (await database()
              .ref(`message/`)
              .child(`/${this.state.currentUser}/`)
              .child(`/${this.state.userSelected}`)
              .push()).key;
            let updates = {};
            let message = {
              text: messages[0].text,
              createdAt: database.ServerValue.TIMESTAMP,
              from: this.state.currentUser,
            };
            updates[
              `message/${this.state.currentUser}/${
                this.state.userSelected
              }/${messageId}`
            ] = message;
            updates[
              `message/${this.state.userSelected}/${
                this.state.currentUser
              }/${messageId}`
            ] = message;
            database()
              .ref()
              .update(updates, () => {
                this.setState({textMessage: ''});
              });
          } catch (error) {
            console.log('This error from chat', error);
          }
        }
      },
    );
  }

  render() {
    return (
      <>
        <Modal
          isVisible={this.state.showModal}
          onBackdropPress={this.toggleModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: '30%',
              left: 10,
              width: 300,
              height: 300,
            }}>
            <Image
              source={{uri: this.props.route.params.data.photo}}
              style={{width: 300, height: 300}}
            />
          </View>
        </Modal>
        <Header
          containerStyle={{marginTop: -30, backgroundColor: '#fff'}}
          centerComponent={
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(
                  'MapView',
                  this.props.route.params.data,
                )
              }>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                {this.props.route.params.data.name}
              </Text>
            </TouchableOpacity>
          }
          rightComponent={
            <TouchableOpacity onPress={() => this.handleAddPicture()}>
              <Icon name="camera" size={20} />
            </TouchableOpacity>
          }
          leftComponent={
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrowleft" size={20} />
              </TouchableOpacity>
              <Avatar
                containerStyle={{marginLeft: 14}}
                onPress={() => this.toggleModal()}
                rounded
                source={{
                  uri: this.props.route.params.data.photo,
                }}
              />
            </View>
          }
        />
        <GiftedChat
          showUserAvatar={false}
          showAvatarForEveryMessage={false}
          renderAvatar={false}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.authData.data,
  };
};

export default connect(
  mapStateToProps,
  {},
)(Rooms);
