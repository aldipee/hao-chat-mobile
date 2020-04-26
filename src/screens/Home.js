import React, {useEffect, useState} from 'react';
import {AppState, View, FlatList} from 'react-native';
import {ListItem, SearchBar, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {setLogout, setUserLocation} from '../redux/actions/AuthAction';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({skipPermissionRequests: true});

function Home(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [appState, setAppState] = useState(AppState.currentState);

  const onLogout = () => {
    props.setLogout();
    props.navigation.navigate('Home');
  };

  const onSearch = keyword => {
    if (keyword === '') {
      setUsers(data);
    } else {
      const data = users.filter((data, index) => data.name.includes(keyword));
      setUsers(data);
    }
  };

  const _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      database()
        .ref(`UsersList/${props.user.uid}`)
        .update({
          status: 'Offline',
        })
        .then(() => console.log('Data updated.'));
    } else if (nextAppState === 'active') {
      database()
        .ref(`UsersList/${props.user.uid}`)
        .update({
          status: 'Online',
        })
        .then(() => console.log('Data updated.'));
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      data => {
        setLocation(data.coords);
        setUserLocation(data.coords);
      },
      err => {
        console.log(err);
      },
    );
    database()
      .ref('UsersList/')
      .on('value', snapshot => {
        const currentUser = props.user.uid;
        const data = snapshot.val();
        const user = Object.values(data);
        const result = user.filter(u => u.uid !== currentUser);
        setData(result);
        setUsers(result);
        setLoading(false);
      });
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  return (
    <>
      <ScrollView>
        <Header
          leftComponent={() => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Profile', props.user)}>
              <Icon name="ios-menu" color="#000" size={30} />
            </TouchableOpacity>
          )}
          centerComponent={{
            text: 'Home',
            style: {color: '#000', fontSize: 17, fontWeight: 'bold'},
          }}
          rightComponent={
            <TouchableOpacity onPress={onLogout}>
              <Icon name="ios-settings" color="#000" size={30} />
            </TouchableOpacity>
          }
          containerStyle={{
            height: 50,
            paddingBottom: 20,
            backgroundColor: '#fff',
          }}
        />
        <View style={{paddingHorizontal: 0, backgroundColor: '#fefefe'}}>
          <SearchBar
            value={search}
            onChangeText={text => {
              setSearch(text);
              onSearch(text);
            }}
            placeholder="Search your friends ..."
            lightTheme={true}
            inputContainerStyle={{
              backgroundColor: '#eee',
              paddingVertical: 1,
              marginVertical: 0,
              borderWidth: 0,
              borderColor: '#fff',
            }}
            inputStyle={{
              paddingVertical: 0,
              marginVertical: 0,
              fontSize: 15,
              borderWidth: 0,
            }}
            containerStyle={{
              backgroundColor: '#fff',
              borderWidth: 0,
              borderColor: '#fff',
            }}
          />

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={users}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Room', {data: item})}>
                <ListItem
                  key={index}
                  containerStyle={{
                    backgroundColor: '#fefefe',
                    paddingHorizontal: 20,
                    paddingVertical: 11,
                  }}
                  cont
                  leftAvatar={{
                    rounded: true,
                    source: {uri: item.photo},
                  }}
                  title={item.name}
                  titleStyle={{fontWeight: '700'}}
                  rightSubtitle={''}
                  subtitle={item.status}
                  bottomDivider
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </>
  );
}

const mapStateToProps = state => {
  return {
    user: state.authData.data,
  };
};

export default connect(
  mapStateToProps,
  {setLogout, setUserLocation},
)(Home);
