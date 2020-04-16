import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

const TopBarScreen = props => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={{marginRight: 10}}
        onPress={() => alert('Notification Icon pressed ...')}>
        <Icon name="notifications" color={'#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginRight: 20}}
        onPress={() => alert('Cart Icon pressed ...')}>
        <Icon name="shopping-cart" color={'#ffffff'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginRight: 10}}
        onPress={() => props.menuOnPress}>
        <Icon name="reorder" color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
};

export default TopBarScreen;
