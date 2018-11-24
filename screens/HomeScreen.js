import React from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import axios from 'axios';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);

      this.state = {
          status: 'Can I drink water here?',
      };
  }

  getWaterCondition(cityName){
      axios.get(`http://192.168.43.213:8080/api/water-conditions/name/${cityName}`).then((result) => {
          console.log(result.request.response);
          }
      ).catch(error => {
          console.log(error);
      })
  }

  async getLocation() {
      this.setState({
          status: 'Finding location...',
      });

      console.log("Ask for location permission...");
      let {status} = await Permissions.askAsync(Permissions.LOCATION);
      console.log("Got back: " + status);

      if (status !== 'granted') {
          console.log("Failed to get geolocation: access not granted, status " + status);
          this.setState({
              status: status,
          });
          return;
      }
      try {
          console.log("Request geocode...");
          let location = await Location.getCurrentPositionAsync({});
          console.log(location);
          const {latitude, longitude} = location.coords;
          let geocode = await Location.reverseGeocodeAsync({latitude, longitude});
          console.log("Geocode:");
          console.log(geocode);

          console.log("DONE");
          this.setState({
              status: 'We are in ' + geocode[0].city,
          });
          this.getWaterCondition(geocode[0].city);

      }
      catch (error) {
          console.log("Failed to get geolocation:");
          this.setState({
              status: error,
          });
          console.log(error);
      }
  }

  render() {
  return (
      <View style={styles.container}>
          <Text style={styles.status}>{this.state.status}</Text>
          <TouchableOpacity onPress={() => this.getLocation()} style={styles.button}>
                <Image
                    style={styles.image}
                     source={require('./faucet.jpg')}
                />
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'steelblue',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
    image: {

        width: Dimensions.get('window').width - 180,
        height: Dimensions.get('window').width - 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    status: {
        marginBottom: 80,
        color: 'skyblue',
        fontSize: 30,
    },
    button: {
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').width - 100,
        backgroundColor: 'skyblue',
        borderRadius: 160,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
