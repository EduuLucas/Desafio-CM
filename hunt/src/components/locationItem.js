import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class LocationItem extends Component {
  criaMarker = async () => {
    const response = await this.props.fetchDetails(this.props.place_id);
    console.log(this.props);
    // this.props.navigation.navigate("Map");
  }

  render() {
    return (
      <TouchableOpacity style={styles.root} onPress={this.criaMarker}>
        <Text>{this.props.description}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: "center"
  }
})