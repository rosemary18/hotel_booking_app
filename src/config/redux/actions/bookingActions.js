import {GET_CART} from './types';
import AsyncStorage from '@react-native-community/async-storage';

export const storeRoomCart = async data => {
  await AsyncStorage.setItem('Cart', JSON.stringify(data));
};
