import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Agenda from '../pages/Agenda';

Icon.loadFont();

const Tab = createBottomTabNavigator();

export default function HomeRoutes() {

    return (
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: '#fff',
            labelStyle: {
                fontSize: 15,
            },
            style: {
                backgroundColor: '#f66095',
            },
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" size={size} color={color} />
              )
            }}
          />
          <Tab.Screen
            name="Agenda"
            component={Agenda}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="calendar-today" size={size} color={color} />
              )
            }}
          />
        </Tab.Navigator>
    );
}  