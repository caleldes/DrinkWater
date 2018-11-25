import React from 'react';
import {
    Platform, StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions, ScrollView,
    ImageBackground
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      this.state = {
          status: 'Czy mogę się napić z kranu?',
      };
  }

  componentWillMount(){
      this.setState({
          status: 'Czy mogę się napić z kranu?'
      })
  }

  async getWaterCondition(cityName){
      const result = await axios.get(`http:/tapwater.herokuapp.com/api/water-condition/cityName/${cityName}`).catch(error => {
          console.log(error);
      });

      return JSON.parse(result.request.response);
  }

  async getLocation() {
      this.setState({
          status: 'Sprawdzenie lokalizacji...',
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
          const cityName = geocode[0].city;
          const data =  await this.getWaterCondition(cityName);
          this.setState({
              status: 'Czy mogę się napić z kranu?'
          },() => this.props.navigation.navigate('Data', {
                  data,
                  cityName,
              })
          );
      }
      catch (error) {
          console.log("Failed to get geolocation:");
          console.log(error);
      }
  }

  render() {
      const {
        status,
      } = this.state;
      return (
          <ImageBackground source={require('./background.jpg')} style={styles.container}>
              <Text style={styles.status}>{status}</Text>
              <TouchableOpacity onPress={() => this.getLocation()} style={styles.button}>
                    <Image
                        style={styles.image}
                         source={require('./faucet.jpg')}
                    />
              </TouchableOpacity>
          </ImageBackground>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        width: '100%',
        height: '110%',
    },
    container2: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        width: '100%',
        height: '110%',
    },
    header: {
        flexDirection: 'row',
    },
    headerTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        color: 'white',
        fontSize: 40,
        fontWeight: '400'
    },
    keyValue: {
        fontSize: 40,
        fontWeight: '400'
    },
    city: {
        color: 'white',
        fontSize: 40,
        fontWeight: '400',
        alignItems: 'center',
    },
    keyList:{
        width: Dimensions.get('window').width,
        justifyContent: 'center',
    },
    body:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').width - 100,
        backgroundColor: 'white',
        borderRadius: 160,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBack: {

        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 50,
    }
});
