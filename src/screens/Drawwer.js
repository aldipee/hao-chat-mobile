import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Setting from '../screens/Settings';

const Drawer = createDrawerNavigator();

const Menu = () => {
  return (
    <>
      {/* <View>
        <Text>Hola</Text>
      </View> */}
      <Drawer.Navigator
        drawerStyle={{
          backgroundColor: '#c6cbef',
          width: 240,
        }}>
        <Drawer.Screen name="setting" component={Setting} />
      </Drawer.Navigator>
    </>
  );
};

export default Menu;
