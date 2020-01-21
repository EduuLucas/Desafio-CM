import React, {Component} from "react";
import { ActivityIndicator,StyleSheet, Text,View, TextInput, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import geolib from "geolib";
import Geolocation from "react-native-geolocation-service";
import { Root, Popup } from 'popup-ui';

import Search from "../components/search/index";
import Directions from "../components/directions/index";

export default class Map extends Component {
  state = {
    region: null,
    destination: null
  }

  calculaTempo(){
    const { region, destination } = this.state;
    const distance = geolib.getDistance( region, destination, 1 );
  }

  componentDidMount(){
    let latitude = 0;
    let longitude = 0;

    Geolocation.getCurrentPosition(
      pos => {
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;

        let regionTake={latitude: latitude, longitude: longitude, latitudeDelta: 0.0143, longitudeDelta: 0.0134}

        this.setState({ 
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        })
        
        setTimeout(() => {
          this.mapView.animateToRegion(regionTake, 1000);
        }, 2000);  
      },
      err => console.log(err)
    )
  }

  handleLocationSelected = (data, { geometry }) => {
    const { location: { lat: latitude, lng: longitude }} = geometry;
  
    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      },
    })
  }

  render() {
    const { region, destination } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.mapView = map}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initiaRregion={{region}}
          loadingEnabled
        >
          { destination && (
            <Directions
              origin={region}
              destination={destination}
              onReady={result => {
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 50,
                    left: 50,
                    top: 50,
                    bottom: 50,
                  }
                });
              }}
            />
          )}
          { destination && (
            <Marker coordinate={ destination }/>
          )}
          { destination && (
            this.calculaTempo()
          )}
        </MapView>
        <Search onLocationSelected={this.handleLocationSelected}/>
      </View>
    );
  }
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1
  },
})