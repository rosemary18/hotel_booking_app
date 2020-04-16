import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DashboardScreen,
  RoomsScreen,
  NewsScreen,
} from '../../view/DashboardScreens';
import {Icon} from 'react-native-elements';
import {Logo} from '../../assets/img';
import {NotificationsScreen} from '../../view/NotificationsScreens';
import {CartScreen} from '../../view/CartScreens';

const StackRoutes = createStackNavigator();

const DashboardStackRoutes = ({navigation}) => {
  return (
    <StackRoutes.Navigator
      initialRouteName="Dashboard"
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
              onPress={() => navigation.navigate('Notification')}>
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
              style={{marginRight: 20}}
              onPress={() => navigation.navigate('Cart')}>
              <View
                style={{
                  position: 'absolute',
                  height: 6,
                  width: 6,
                  borderRadius: 25,
                  backgroundColor: 'red',
                  marginLeft: 23,
                }}
              />
              <Icon name="shopping-cart" color="#889aa4" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.toggleDrawer()}>
              <Icon name="reorder" color="#889aa4" />
            </TouchableOpacity>
          </View>
        ),
        headerTintColor: '#889aa4',
      }}>
      <StackRoutes.Screen name="Dashboard" component={DashboardScreen} />
      <StackRoutes.Screen
        name="Rooms"
        component={RoomsScreen}
        options={{headerTitle: 'Rooms', headerLeft: null}}
      />
      <StackRoutes.Screen
        name="News"
        component={NewsScreen}
        options={{headerTitle: 'News'}}
      />
      <StackRoutes.Screen
        name="Notification"
        component={NotificationsScreen}
        options={{headerTitle: 'Notifications', headerLeft: null}}
      />
      <StackRoutes.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitle: 'Cart',
          headerLeft: null,
          headerTintColor: '#889aa4',
        }}
      />
    </StackRoutes.Navigator>
  );
};

export default DashboardStackRoutes;
