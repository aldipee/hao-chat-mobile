import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {getSingleData} from '../src/redux/actions/AuthAction';

// Screens
import Home from '../src/screens/Home';
import SettingsDrawer from '../src/screens/Drawwer';
import Chat from '../src/screens/Chat';
import Rooms from '../src/screens/Rooms';
import Login from '../src/screens/Login';
import Profile from '../src/screens/Profile';
import Register from '../src/screens/Register';
import SendPhone from '../src/screens/SendPhone';
import UploadImage from '../src/screens/UploadImage';
import UploadImageRegister from '../src/screens/UploadImageRegister';
import MapView from './screens/MapView';

const Stack = createStackNavigator();

const IndexHome = props => {
  useEffect(() => {
    props.getSingleData();
  }, []);
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {props.authData.isLogin ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </>
        )}

        <Stack.Screen
          name="Room"
          component={Rooms}
          options={{headerShown: false}}
        />
        <Stack.Screen name="MapView" component={MapView} />

        <Stack.Screen
          name="Test"
          component={SendPhone}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UploadImage"
          component={UploadImageRegister}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="SettingScreen"
          component={SettingsDrawer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  authData: state.authData,
});

const mapDispatchToProps = {getSingleData};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexHome);
