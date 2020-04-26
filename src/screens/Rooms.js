import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Avatar} from 'react-native-elements';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

class Rooms extends Component {
  state = {
    currentUser: this.props.userData.uid,
    userSelected: this.props.route.params.data.uid,
    messages: [],
    messageList: [],
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
            data.text = data.message;
            data._id = index;
            data.createdAt = data.time;
            data.user = {
              _id: data.from === this.state.currentUser ? 1 : 2,
              avatar:
                data.from === this.state.currentUser
                  ? null
                  : this.props.route.params.data.photo,
            };
            return data;
          });
          console.log(d, 'CEEr');
          return {
            messages: d,
          };
        });
      });
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
  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
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
              message: messages[0].text,
              time: database.ServerValue.TIMESTAMP,
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
                rounded
                source={{
                  uri: this.props.route.params.data.photo,
                }}
              />
            </View>
          }
        />
        <GiftedChat
          showAvatarForEveryMessage={false}
          renderAvatar={false}
          messages={this.state.messages.reverse()}
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
