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

const StackRoutes = createStackNavigator();
const DashboardStackRoutes = ({navigation}) => {
  return (
    <StackRoutes.Navigator
      initialRouteName="Screen1"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#8ac6d1',
        },
        title: 'Header',
        headerTitle: () => (
          <Image source={Logo} style={{height: 18, width: 25}} />
        ),
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => navigation.openDrawer()}>
              <Icon name="notifications" color={'#ffffff'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => navigation.openDrawer()}>
              <Icon name="shopping-cart" color={'#ffffff'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => navigation.openDrawer()}>
              <Icon name="reorder" color={'#ffffff'} />
            </TouchableOpacity>
          </View>
        ),
      }}>
      <StackRoutes.Screen name="Screen1" component={DashboardScreen} />
      <StackRoutes.Screen name="Screen2" component={RoomsScreen} />
      <StackRoutes.Screen name="Screen3" component={NewsScreen} />
    </StackRoutes.Navigator>
  );
};
/*  <TouchableOpacity
   style={{paddingLeft: 10}}
   onPress={() => navigation.openDrawer()}>
   <Icon name="reorder" color={'#ffffff'} />
 </TouchableOpacity>; */
export default DashboardStackRoutes;
