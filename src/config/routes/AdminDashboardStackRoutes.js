import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {ADashboardScreen} from '../../view/AdminScreens/DashboardScreens';
import {Logo} from '../../assets/img';
import {AdminNotificationScreen} from '../../view/AdminScreens/NotificationScreens';

const StackRoutes = createStackNavigator();

const AdminDashboardStackRoutes = ({navigation}) => {
  return (
    <StackRoutes.Navigator
      initialRouteName="AdminHome"
      screenOptions={{
        headerStyle: {
          shadowOpacity: 1,
        },
        headerTitle: () => (
          <Image source={Logo} style={{height: 25, width: 45}} />
        ),
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => navigation.navigate('AdminNotif')}>
              <View
                style={{
                  position: 'absolute',
                  height: 6,
                  width: 6,
                  borderRadius: 25,
                  backgroundColor: 'red',
                  marginLeft: 16,
                }}
              />
              <Icon name="notifications" color="#889aa4" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.toggleDrawer()}>
              <Icon name="reorder" color="#889aa4" />
            </TouchableOpacity>
          </View>
        ),
      }}>
      <StackRoutes.Screen name="AdminHome" component={ADashboardScreen} />
      <StackRoutes.Screen
        name="AdminNotif"
        component={AdminNotificationScreen}
      />
    </StackRoutes.Navigator>
  );
};

export default AdminDashboardStackRoutes;
