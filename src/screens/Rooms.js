import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Avatar, Image} from 'react-native-elements';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import SortData from 'sort-objects-array';
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
          rightComponent={{icon: 'home', color: '#000'}}
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
