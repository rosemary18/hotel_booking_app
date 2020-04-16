import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {StandartRoom, DeluxeRoom, SuitRoom} from '../../assets/img';
import {getRoom} from '../../config/redux/actions/roomActions';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {storeRoomCart} from '../../config/redux/actions/bookingActions';
import AsyncStorage from '@react-native-community/async-storage';
import {ToastAndroid} from 'react-native';
export class RoomsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      dateFrom: '',
      dateTo: '',
      CartData: [],
      roomType: '',
      roomNumber: '',
      roomId: '',
      roomInven: [],
      maxPerson: [],
      roomPrice: 0,
    };
  }
  componentDidMount() {
    this.props.getRoom();
  }
  async storeCart() {
    const data = await AsyncStorage.getItem('Cart');
    this.setState({CartData: JSON.parse(data)});
    const newData = {
      roomNumber: this.state.roomId,
      dateFrom: this.state.dateFrom,
      dateTo: this.state.dateTo,
    };
    this.state.CartData.push(newData);
    storeRoomCart(this.state.CartData);
    this.setState({showModal: false});
    ToastAndroid.show('Saved to Cart', ToastAndroid.SHORT);
  }
  render() {
    const data = this.props.room.data;
    let roomNumber = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      if (dataItem.rm_type.type_name === this.state.roomType) {
        roomNumber.push({
          label: `Room ${dataItem.rm_number}`,
          value: `${dataItem._id}`,
        });
      }
    }
    let uid = 0;
    const displayRoom = this.props.room.data.map((data, index) => {
      return (
        <View style={{height: 300, marginBottom: 15}} key={index}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#889aa4',
              borderRadius: 20,
              backgroundColor: '#ffffff',
              flexDirection: 'row',
            }}>
            <View>
              <Image
                source={
                  data.rm_type.type_name === 'Standart Room'
                    ? StandartRoom
                    : data.rm_type.type_name === 'Deluxe Room'
                    ? DeluxeRoom
                    : data.rm_type.type_name === 'Executive Suit'
                    ? SuitRoom
                    : null
                }
                style={{
                  flex: 1,
                  width: 170,
                  borderTopLeftRadius: 19,
                  borderBottomLeftRadius: 19,
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
              <Text style={{color: '#889aa4', marginBottom: 5, fontSize: 12}}>
                Room Type : {data.rm_type.type_name}
              </Text>
              <Text style={{color: '#889aa4', marginBottom: 5, fontSize: 12}}>
                Room Number : {data.rm_number}
              </Text>
              <Text style={{color: '#889aa4', fontSize: 12}}>Facilities :</Text>
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
                  {data.rm_inventory.map((fac, index) => (
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
                <Text style={{color: '#889aa4', fontSize: 16}}>Price :</Text>
                <Text style={{color: 'red', fontSize: 16}}>
                  $ {data.rm_price}.00
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.setState({
                roomType: data.rm_type.type_name,
                showModal: true,
                roomId: data._id,
                roomInven: data.rm_inventory,
                maxPerson: data.rm_max_person,
                roomPrice: data.rm_price,
                roomNumber: data.rm_number,
              });
              console.warn(this.state);
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 13,
                backgroundColor: '#889aa4',
                marginTop: 5,
                borderRadius: 20,
                shadowOpacity: 1,
              }}>
              <Text style={{fontWeight: 'bold', color: '#ffffff'}}>BOOK</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
    return (
      <ScrollView>
        <View style={{flex: 1, padding: 25, paddingBottom: 5}}>
          {this.props.room.data ? (
            displayRoom
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator />
            </View>
          )}
        </View>
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                    justifyContent: 'center',
                    paddingLeft: 15,
                  }}>
                  <Text style={{color: '#889aa4'}}>
                    Room {this.state.roomNumber}
                  </Text>
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
                        {this.state.maxPerson
                          ? this.state.maxPerson.adult
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
                        {this.state.maxPerson
                          ? this.state.maxPerson.children
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
                    {this.state.roomInven.length > 0
                      ? this.state.roomInven.map((facility, index) => (
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
                      Price : $ {this.state.roomPrice}
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
                  <TouchableOpacity onPress={() => this.storeCart()}>
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
                        ADD TO CART
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
)(RoomsScreen);
