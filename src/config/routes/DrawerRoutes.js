import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {SettingsScreen} from '../../view/SettingsScreens';
import {Icon} from 'react-native-elements';
import DashboardStackRoutes from './DashboardStackRoutes';

const Drawer = createDrawerNavigator();

class DrawerRoutes extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" drawerPosition="right">
          <Drawer.Screen name="Home" children={DashboardStackRoutes} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Logout" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default DrawerRoutes;
