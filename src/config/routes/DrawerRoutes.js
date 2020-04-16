import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {SettingsScreen} from '../../view/SettingsScreens';
import {Icon} from 'react-native-elements';
import DashboardStackRoutes from './DashboardStackRoutes';
import {LoadingScreen} from '../../view/AuthScreens';
import {CustomDrawerScreen} from '../../view/CustomDrawerScreens';

const Drawer = createDrawerNavigator();

class DrawerRoutes extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerPosition="right"
          drawerContent={props => <CustomDrawerScreen {...props} />}>
          <Drawer.Screen name="Home" children={DashboardStackRoutes} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default DrawerRoutes;
