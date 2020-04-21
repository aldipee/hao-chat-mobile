import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chat from './screens/Chat';
import Home from './screens/Home';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen component={Home} name="Home" />
        <Tab.Screen component={Chat} name="Chat" />
      </Tab.Navigator>
    </>
  );
};

export default BottomTab;
