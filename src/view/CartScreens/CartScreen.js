import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {StandartRoom, DeluxeRoom, SuitRoom} from '../../assets/img';

import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import {connect} from 'react-redux';
import {getRoom} from '../../config/redux/actions/roomActions';
import AsyncStorage from '@react-native-community/async-storage';

export class CartScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      roomType: 'Standart Room',
      roomNumber: '',
      dateFrom: '',
      dateTo: '',
      cartSelect: [],
      CartData: [],
      index: 0,
    };
  }
  componentDidMount() {
    this.props.getRoom();
    this.setCart();
  }

  async setCart() {
    const getCart = await AsyncStorage.getItem('Cart');
    if (JSON.parse(getCart) === null) {
      this.setState({CartData: []});
    } else {
      this.setState({CartData: JSON.parse(getCart)});
    }
  }

  async delCart() {
    const data = this.state.CartData;
    data.splice(data.indexOf(this.state.index), 1);
    await AsyncStorage.setItem('Cart', JSON.stringify(data));

    this.setCart();
    this.setState({showModal: false});
  }

  render() {
    const data = this.props.room.data;
    let roomNumber = [];
    let roomData = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      if (dataItem.rm_type.type_name === this.state.roomType) {
        roomNumber.push({
          label: `Room ${dataItem.rm_number}`,
          value: `${dataItem._id}`,
        });
      }
      if (this.state.roomNumber === dataItem._id) {
        roomData.push(dataItem);
      }
    }
    return (
      <View style={{flex: 1, paddingBottom: 15}}>
        <ScrollView style={{padding: 15}}>
          {this.state.CartData.length > 0 ? (
            this.state.CartData.map((cartItem, index) => {
              let filteredData = [];
              for (let i = 0; i < data.length; i++) {
                const dataItem = data[i];
                if (dataItem._id === cartItem.roomNumber) {
                  filteredData.push(dataItem);
                }
              }
              return (
                <View
                  key={index}
                  style={{
                    height: 300,
                    borderRadius: 15,
                    marginBottom: 15,
                    backgroundColor: '#ffffff',
                    shadowOpacity: 1,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <View>
                      <Image
                        source={
                          filteredData[0].rm_type.type_name === 'Standart Room'
                            ? StandartRoom
                            : filteredData[0].rm_type.type_name ===
                              'Deluxe Room'
                            ? DeluxeRoom
                            : filteredData[0].rm_type.type_name ===
                              'Executive Suit'
                            ? SuitRoom
                            : null
                        }
                        style={{
                          flex: 1,
                          width: 170,
                          borderTopLeftRadius: 14,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        padding: 10,
                        shadowOpacity: 1,
                      }}>
                      <Text
                        style={{
                          color: '#889aa4',
                          marginBottom: 5,
                          fontSize: 12,
                        }}>
                        Room Type : {filteredData[0].rm_type.type_name}
                      </Text>
                      <Text
                        style={{
                          color: '#889aa4',
                          marginBottom: 5,
                          fontSize: 12,
                        }}>
                        Room Number : {filteredData[0].rm_number}
                      </Text>
                      <Text style={{color: '#889aa4', fontSize: 12}}>
                        Facilities :
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: '#889aa4',
                          borderRadius: 10,
                          padding: 10,
                          marginTop: 10,
                        }}>
                        <Text style={{color: '#889aa4', fontSize: 12}}>
                          {filteredData[0].rm_inventory.map((fac, index) => (
                            <Text key={index}>{fac} | </Text>
                          ))}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          paddingRight: 10,
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text style={{color: '#889aa4', fontSize: 16}}>
                          Price :
                        </Text>
                        <Text style={{color: 'red', fontSize: 16}}>
                          $ {filteredData[0].rm_price}.00
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 40,
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      paddingRight: 15,
                      backgroundColor: '#889aa4',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          showModal: true,
                          roomType: filteredData[0].rm_type.type_name,
                          roomNumber: cartItem.roomNumber,
                          dateFrom: cartItem.dateFrom,
                          dateTo: cartItem.dateTo,
                          index: index,
                        })
                      }>
                      <View
                        style={{
                          height: 30,
                          width: 110,
                          backgroundColor: '#ffffff',
                          borderRadius: 15,
                          shadowOpacity: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingLeft: 9,
                        }}>
                        <Text style={{color: '#889aa4', fontSize: 12}}>
                          BOOK NOW{' '}
                        </Text>
                        <Icon name="keyboard-arrow-right" color="#889aa4" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={{flex: 1, justifyContent: 'center', paddingTop: 15}}>
              <Text>No data yet</Text>
            </View>
          )}
        </ScrollView>
        <Modal transparent={true} visible={this.state.showModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000aa',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 30,
              paddingVertical: 150,
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 25,
                height: 580,
                width: 340,
              }}>
              <View style={{alignItems: 'flex-end', padding: 10}}>
                <TouchableOpacity
                  onPress={() => this.setState({showModal: false})}>
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#889aa4',
                    }}>
                    <Text style={{color: '#ffffff'}}>&times;</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  paddingTop: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({roomType: 'Standart Room'});
                    }}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 50,
                      backgroundColor:
                        this.state.roomType === 'Standart Room'
                          ? '#ffffff'
                          : '#889aa4',
                      borderColor:
                        this.state.roomType === 'Standart Room'
                          ? '#889aa4'
                          : '#ffffff',
                      borderWidth: 1,
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25,
                    }}>
                    <Text
                      style={{
                        color:
                          this.state.roomType === 'Standart Room'
                            ? '#889aa4'
                            : '#ffffff',
                        fontSize: 12,
                      }}>
                      Standart Room
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({roomType: 'Deluxe Room'});
                    }}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 50,
                      backgroundColor:
                        this.state.roomType === 'Deluxe Room'
                          ? '#ffffff'
                          : '#889aa4',
                      borderColor:
                        this.state.roomType === 'Deluxe Room'
                          ? '#889aa4'
                          : '#ffffff',
                      borderWidth: 1,
                    }}>
                    <Text
                      style={{
                        color:
                          this.state.roomType === 'Deluxe Room'
                            ? '#889aa4'
                            : '#ffffff',
                        fontSize: 12,
                      }}>
                      Deluxe Room
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({roomType: 'Executive Suit'});
                    }}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 50,
                      backgroundColor:
                        this.state.roomType === 'Executive Suit'
                          ? '#ffffff'
                          : '#889aa4',
                      borderColor:
                        this.state.roomType === 'Executive Suit'
                          ? '#889aa4'
                          : '#ffffff',
                      borderWidth: 1,
                      borderBottomRightRadius: 25,
                      borderTopRightRadius: 25,
                    }}>
                    <Text
                      style={{
                        color:
                          this.state.roomType === 'Executive Suit'
                            ? '#889aa4'
                            : '#ffffff',
                        fontSize: 12,
                      }}>
                      Executive Suit
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#889aa4',
                    borderRadius: 15,
                    marginBottom: 15,
                    height: 45,
                  }}>
                  <RNPickerSelect
                    onValueChange={value => this.setState({roomNumber: value})}
                    items={roomNumber}
                    value={this.state.roomNumber}
                    placeholder={{
                      label: 'Available Room',
                      value: null,
                      displayValue: false,
                    }}
                  />
                </View>

                <View
                  style={{
                    borderRadius: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: 10,
                    marginBottom: 15,
                  }}>
                  <Text style={{color: '#889aa4'}}>From : </Text>
                  <DatePicker
                    customStyles={{
                      dateInput: {
                        borderRadius: 15,
                        borderColor: '#889aa4',
                      },
                    }}
                    placeholder="Select date"
                    date={this.state.dateFrom}
                    minDate={moment(Date.now()).format('YYYY-MM-DD')}
                    onDateChange={date => this.setState({dateFrom: date})}
                  />
                </View>
                <View
                  style={{
                    borderRadius: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                    paddingLeft: 10,
                  }}>
                  <Text style={{color: '#889aa4'}}>To : </Text>
                  <DatePicker
                    customStyles={{
                      dateInput: {
                        borderRadius: 15,
                        borderColor: '#889aa4',
                      },
                    }}
                    placeholder="Select date"
                    date={this.state.dateTo}
                    minDate={moment(Date.now())
                      .add(1, 'days')
                      .format('YYYY-MM-DD')}
                    onDateChange={date => this.setState({dateTo: date})}
                  />
                </View>
                <View
                  style={{
                    height: 60,
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={{marginBottom: 8, color: '#889aa4'}}>
                    MAX PERSON
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      borderRadius: 14,
                      backgroundColor: '#ffffff',
                      borderWidth: 1,
                      borderColor: '#889aa4',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: '#889aa4'}}>
                        Adult :{' '}
                        {roomData.length > 0
                          ? roomData[0].rm_max_person.adult
                          : '0'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: '#889aa4'}}>
                        Children :{' '}
                        {roomData.length > 0
                          ? roomData[0].rm_max_person.children
                          : '0'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    borderColor: '#889aa4',
                    marginBottom: 10,
                  }}>
                  <Text style={{color: '#889aa4'}}>
                    Facilities :{' '}
                    {roomData.length > 0
                      ? roomData[0].rm_inventory.map((facility, index) => (
                          <Text key={index}>{facility} | </Text>
                        ))
                      : '-'}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginTop: 7,
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      borderBottomColor: '#889aa4',
                      borderBottomWidth: 1,
                      paddingBottom: 6,
                      paddingRight: 5,
                    }}>
                    <Text style={{color: '#889aa4'}}>
                      Price : ${' '}
                      {roomData.length > 0 ? roomData[0].rm_price : '0'}
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={() => alert('booking up')}>
                    <View
                      style={{
                        backgroundColor: '#889aa4',
                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 14,
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontWeight: 'bold',
                        }}>
                        BOOKING
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.delCart()}>
                    <View
                      style={{
                        backgroundColor: '#889aa4',
                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 14,
                        borderRadius: 20,
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontWeight: 'bold',
                        }}>
                        DELETE
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  room: state.room,
});

export default connect(
  mapStateToProps,
  {getRoom},
)(CartScreen);
