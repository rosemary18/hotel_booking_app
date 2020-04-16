import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AdminDashboardStackRoutes from './AdminDashboardStackRoutes';
import {CustomAdminDrawerScreen} from '../../view/AdminScreens/CustomAdminDrawerScreens';

const Drawer = createDrawerNavigator();

export class AdminDrawerRoutes extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="AdminDashboard"
          drawerPosition="right"
          drawerContent={props => <CustomAdminDrawerScreen {...props} />}>
          <Drawer.Screen
            name="AdminDashboard"
            children={AdminDashboardStackRoutes}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default AdminDrawerRoutes;
