import React from "react";
import { withFormik} from 'formik';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import api from "../api/api";
import * as yup from "yup";
import firebase from "react-native-firebase";
import { Root, Popup } from 'popup-ui';

const Login = (props) => (
  <Root>
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        value={props.values.email}
        inlineImageLeft='imageemail'
        inlineImagePadding={25}
        placeholder="Email"
        textContentType="emailAddress"
        onChangeText={text => props.setFieldValue('email', text)}
      />
      <TextInput
        style={styles.inputs}
        value={props.values.password}
        inlineImageLeft='imagepassword'
        inlineImagePadding={25}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => props.setFieldValue('password', text)}
      />
      
      <TouchableOpacity style={styles.buttonNumber} onPress={() => props.navigation.navigate('LoginNumber')}>
        <Text style={styles.buttonText}>Login with number</Text>
      </TouchableOpacity>

      <View style={styles.viewButtons}>
        <TouchableOpacity style={styles.buttonRegister} onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonLogin} onPress={props.handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Root>
);

export default withFormik({
  handleSubmit: (values) => {
    firebase.auth().signInWithEmailAndPassword( values.email, values.password )
    .then(() =>
      values.navigation.navigate("Map")
    )
    .catch(err => {
      Popup.show({
        type: 'Warning',
        title: 'Ops!',
        button: true,
        textBody: 'Aparentemente sua credencial é inválida',
        buttontext: 'Ok',
        callback: () => Popup.hide()
      }),
      console.log(err);
    })
  }
})(Login);

const styles = StyleSheet.create({
  loginButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#4b4b4b",
    padding: 15
  },

  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonLogin: {
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 65,
    paddingRight: 65,
    backgroundColor: "#7d5fff",
    borderRadius: 5,
    fontFamily: "Arial",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonNumber: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#7d5fff",
    borderRadius: 5,
    fontFamily: "Arial",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonRegister: {
    backgroundColor: "#e74c3c",
    borderRadius: 5,
    fontFamily: "Arial",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50
  },

  buttonText: {
    color: "white"
  },

  container: {
    flex: 1,
    backgroundColor: "#3d3d3d",
    padding: 25,
    justifyContent: "center",
  },

  inputs: {
    backgroundColor: "#fafafa",
    marginBottom: 15,
    borderRadius: 5,
  },
});