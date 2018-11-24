import React from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class HomeScreen extends React.Component {
  // state = {
  //     location: null,
  //     errorMessage: null,
  // };
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);

      this.state = {
          status: 'Press button...',
      };
  }

  // componentWillMount() {
  //     if (Platform.OS === 'android' && !Constants.isDevice) {
  //         this.setState({
  //             errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
  //         });
  //     } else {
  //         this._getLocationAsync();
  //     }
  // }

  // _getLocationAsync = async () => {
  //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //     if (status !== 'granted') {
  //         this.setState({
  //             errorMessage: 'Permission to access location was denied',
  //         });
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     this.setState({ location });
  // };

    async requestLocation() {
        this.setState({
            status: 'Requesting geocode...',
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
            // console.log(option);
            let geocode = await Location.reverseGeocodeAsync({latitude, longitude});
            console.log("Geocode:");
            console.log(geocode);

            console.log("DONE");
            this.setState({
                status: 'DONE, we are in ' + geocode[0].city,
            });

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
        // let text = 'Waiting..';
        // if (this.state.errorMessage) {
        //     text = this.state.errorMessage;
        // } else if (this.state.location) {
        //     text = JSON.stringify(this.state.location);
        // }
    return (
        <View style={styles.container}>
          {/*<Text style={styles.paragraph}>{text}</Text>*/}
          <Button title="Request Location" onPress={() => this.requestLocation()} />
          <Text>{this.state.status}</Text>
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
        backgroundColor: '#91e8ff',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
});
