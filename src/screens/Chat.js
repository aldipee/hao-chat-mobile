import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import database from '@react-native-firebase/database';
import {Header, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.userData.uid,
      userSelected: this.props.route.params.data.uid,
      message: [],
      textMessage: '',
    };
  }

  renderDate = date => {
    return <Text style={styles.time}>{date}</Text>;
  };

  componentDidMount() {
    // Read all data from database
    // based on currentUser and the chiled is userSelected
    console.log(' Lett');
    database()
      .ref('message/')
      .child(`/${this.state.currentUser}/`)
      .child(`/${this.state.userSelected}/`)
      .on('child_added', value => {
        console.log(value, 'Hola');
        this.setState(prevState => {
          const data = value.val();
          const res = [...prevState.message, value.val()];
          const d = res.map((data, index) => {});
          return {
            message: [...prevState.message, value.val()],
          };
        });
      });
  }

  sendMessage = async () => {
    console.log('HHHHh');
    if (this.state.textMessage.length > 0) {
      try {
        let messageId = (await database()
          .ref(`message/`)
          .child(`/${this.state.currentUser}/`)
          .child(`/${this.state.userSelected}`)
          .push()).key;
        let updates = {};
        let message = {
          message: this.state.textMessage,
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
  };

  render() {
    const {data} = this.props.route.params;
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{marginTop: -30, backgroundColor: '#fff'}}
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
                  uri: data.photo,
                }}
              />
            </View>
          }
          centerComponent={
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MapView', data)}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                {data.name}
              </Text>
            </TouchableOpacity>
          }
          rightComponent={{icon: 'home', color: '#000'}}
        />
        <FlatList
          style={styles.list}
          data={this.state.message}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={message => {
            const item = message.item;
            let inMessage = item.from === this.state.userSelected;
            console.log(item);
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[styles.item, itemStyle]}>
                {!inMessage && this.renderDate(item.date)}
                <View style={[styles.balloon]}>
                  <Text>{item.message}</Text>
                </View>
                {inMessage && this.renderDate(item.date)}
              </View>
            );
          }}
        />
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              value={this.state.textMessage}
              placeholder="Write a message..."
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({textMessage: text})}
            />
          </View>

          <TouchableOpacity style={styles.btnSend} onPress={this.sendMessage}>
            <View style={styles.iconSend}>
              <Icon name="rightsquare" size={30} />
            </View>
            {/* <Image
              source={{
                uri: 'https://png.icons8.com/small/75/ffffff/filled-sent.png',
              }}
              style={styles.iconSend}
            /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9,
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    marginTop: 9,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start',
  },
  itemOut: {
    alignSelf: 'flex-end',
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize: 12,
    color: '#808080',
  },
  item: {
    marginVertical: 6,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 2,
  },
});

const mapStateToProps = state => {
  return {
    userData: state.authData.data,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Chat);
