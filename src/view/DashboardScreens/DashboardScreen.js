import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from 'react-native-elements';
import {
  StandartRoom,
  DeluxeRoom,
  SuitRoom,
  News1,
  News2,
  News3,
  News4,
} from '../../assets/img';
import {connect} from 'react-redux';
import moment from 'moment';
import {getRoom} from '../../config/redux/actions/roomActions';
import {storeRoomCart} from '../../config/redux/actions/bookingActions';
import AsyncStorage from '@react-native-community/async-storage';
import {ToastAndroid} from 'react-native';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      roomType: 'Standart Room',
      roomNumber: '',
      dateFrom: '',
      dateTo: '',
      CartData: [],
    };
  }
  componentDidMount() {
    this.props.getRoom();
  }

  async storeCart() {
    const data = await AsyncStorage.getItem('Cart');
    if (JSON.parse(data) === null) {
      this.setState({CartData: []});
    } else {
      this.setState({CartData: JSON.parse(data)});
    }

    const newData = {
      roomNumber: this.state.roomNumber,
      dateFrom: this.state.dateFrom,
      dateTo: this.state.dateTo,
    };
    this.state.CartData.push(newData);
    storeRoomCart(this.state.CartData);
    console.warn(this.state.CartData);
    this.setState({showModal: false});
    ToastAndroid.show('Saved to Cart', ToastAndroid.SHORT);
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
      <View style={{flex: 1, padding: 15}}>
        <View style={styles.containerBadge}>
          <View style={styles.headerBadge}>
            <Text style={styles.fontStandart}>ROOMS</Text>
          </View>

          <View style={styles.contentBadge}>
            <ScrollView
              horizontal={true}
              style={{padding: 10, paddingRight: 20}}>
              <View>
                <Image source={StandartRoom} style={styles.contextBadge} />
              </View>
              <View>
                <Image source={DeluxeRoom} style={styles.contextBadge} />
              </View>
              <View>
                <Image source={SuitRoom} style={styles.contextBadge} />
              </View>
              <View>
                <Image source={StandartRoom} style={styles.contextBadge} />
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Rooms')}>
            <View style={styles.footerBadge}>
              <Icon name="keyboard-arrow-right" color="#f5f5f5" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.containerBadge}>
          <View style={styles.headerBadge}>
            <Text style={styles.fontStandart}>NEWS</Text>
          </View>

          <View style={styles.contentBadge}>
            <ScrollView
              horizontal={true}
              style={{padding: 10, paddingRight: 20}}>
              <View>
                <Image source={News1} style={styles.contextBadge} />
              </View>
              <View>
                <Image source={News2} style={styles.contextBadge} />
              </View>
              <View>
                <Image source={News3} style={styles.contextBadge} />
              </View>
              <View>
                <Image source={News4} style={styles.contextBadge} />
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => alert('Will redirect to news page soon')}>
            <View style={styles.footerBadge}>
              <Icon name="keyboard-arrow-right" color="#f5f5f5" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={() => this.setState({showModal: true})}>
            <View
              style={{
                backgroundColor: '#889aa4',
                borderRadius: 20,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                BOOK NOW
              </Text>
            </View>
          </TouchableOpacity>
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
                    placeholder={{
                      label: 'Room number',
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
                      : null}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentBadge: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ffffff',
    shadowOpacity: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  containerBadge: {
    flex: 1,
    marginBottom: 15,
    borderRadius: 15,
    marginTop: 5,
    backgroundColor: '#ffffff',
  },
  headerBadge: {
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  footerBadge: {
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#889aa4',
  },
  fontStandart: {
    color: '#889aa4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contextBadge: {
    flex: 1,
    width: 117,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    shadowOpacity: 1,
  },
});
const mapStateToProps = state => ({
  auth: state.auth,
  room: state.room,
});
export default connect(
  mapStateToProps,
  {getRoom},
)(DashboardScreen);
