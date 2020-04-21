import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {View, Text} from 'react-native';
import Chat from './screens/Chat';
import Home from './screens/Home';
import SettingsDrawer from './screens/Drawwer';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />

        <Tab.Screen name="Chat" component={Chat} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTab;
