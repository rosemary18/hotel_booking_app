import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

export class NotificationsScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, padding: 15}}>
          <View style={styles.badgeNotif}>
            <View style={styles.contentNotif}>
              <Text>THIS IS NOTIFICATION</Text>
            </View>
            <View style={styles.timeNotif}>
              <Text style={{fontStyle: 'italic'}}>Today, 09:00</Text>
            </View>
          </View>
          <View style={styles.badgeNotif}>
            <View style={styles.contentNotif}>
              <Text>THIS IS NOTIFICATION</Text>
            </View>
            <View style={styles.timeNotif}>
              <Text style={{fontStyle: 'italic'}}>Today, 09:00</Text>
            </View>
          </View>
          <View style={styles.badgeNotif}>
            <View style={styles.contentNotif}>
              <Text>THIS IS NOTIFICATION</Text>
            </View>
            <View style={styles.timeNotif}>
              <Text style={{fontStyle: 'italic'}}>Today, 09:00</Text>
            </View>
          </View>
          <View style={styles.badgeNotif}>
            <View style={styles.contentNotif}>
              <Text>THIS IS NOTIFICATION</Text>
            </View>
            <View style={styles.timeNotif}>
              <Text style={{fontStyle: 'italic'}}>Today, 09:00</Text>
            </View>
          </View>
          <View style={styles.badgeNotif}>
            <View style={styles.contentNotif}>
              <Text>THIS IS NOTIFICATION</Text>
            </View>
            <View style={styles.timeNotif}>
              <Text style={{fontStyle: 'italic'}}>Today, 09:00</Text>
            </View>
          </View>
          <View style={styles.badgeNotif}>
            <View style={styles.contentNotif}>
              <Text>THIS IS NOTIFICATION</Text>
            </View>
            <View style={styles.timeNotif}>
              <Text style={{fontStyle: 'italic'}}>Today, 09:00</Text>
            </View>
          </View>
          <View style={styles.badgeNotif}>
            <View style={styles.contentNotif}>
              <Text>THIS IS NOTIFICATION</Text>
            </View>
            <View style={styles.timeNotif}>
              <Text style={{fontStyle: 'italic'}}>Today, 09:00</Text>
            </View>
          </View>
          <View style={styles.badgeNotif}>
            <View style={styles.contentNotif}>
              <Text>THIS IS NOTIFICATION</Text>
            </View>
            <View style={styles.timeNotif}>
              <Text style={{fontStyle: 'italic'}}>Today, 09:00</Text>
            </View>
          </View>
          <View style={styles.badgeNotif}>
            <View style={styles.contentNotif}>
              <Text>THIS IS NOTIFICATION</Text>
            </View>
            <View style={styles.timeNotif}>
              <Text style={{fontStyle: 'italic'}}>Today, 09:00</Text>
            </View>
          </View>
          <View style={styles.badgeNotif}>
            <View style={styles.contentNotif}>
              <Text>THIS IS NOTIFICATION</Text>
            </View>
            <View style={styles.timeNotif}>
              <Text style={{fontStyle: 'italic'}}>Today, 09:00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  badgeNotif: {
    shadowOpacity: 1,
    height: 70,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  contentNotif: {
    flex: 1,
    padding: 10,
    borderBottomColor: '#f9f9f9',
    borderBottomWidth: 1,
  },
  timeNotif: {
    padding: 5,
    height: 30,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
});

export default NotificationsScreen;
