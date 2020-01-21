import React from "react";
import { withFormik, ErrorMessage } from 'formik';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { login, signup } from "../api/api";
import * as yup from "yup";
import firebase from "react-native-firebase";
import { Root, Popup } from 'popup-ui';

const Register = (props) => (
  <Root>
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        value={props.values.email}
        inlineImageLeft='imageemail'
        inlineImagePadding={25}
        placeholder="Email"
        onChangeText={text => props.setFieldValue('email', text)}
      />
      <TextInput
        style={styles.inputs}
        value={props.values.password}
        inlineImageLeft='imagepassword'
        inlineImagePadding={25}
        placeholder="Senha"
        secureTextEntry={true}
        onChangeText={text => props.setFieldValue('password', text)}
      />

      <TouchableOpacity style={styles.buttonRegister} onPress={props.handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  </Root>
);

export default withFormik({
  validationSchema: yup.object().shape({
    email: yup.string()
      .email('Digite um e-mail válido')
      .required('Preencha o campo de e-mail'),
    password: yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('Preencha o campo de senha'),
  }),

  handleSubmit: (values) => {
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then(() =>
      Popup.show({
        type: 'Success',
        title: 'Yes!',
        button: true,
        textBody: 'Cadastrado com sucesso!',
        buttontext: 'Ok',
        callback: () => Popup.hide()
      })
    )
    .catch (error => 
        Popup.show({
        type: 'Warning',
        title: 'Ops!',
        button: true,
        textBody: 'Insira um email válido',
        buttontext: 'Ok',
        callback: () => Popup.hide()
      })
    )
  }
})(Register);

const styles = StyleSheet.create({
  buttonText: {
    color: "white"
  },

  container: {
    flex: 1,
    backgroundColor: "#3d3d3d",
    padding: 25,
    justifyContent: "center",
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

  inputs: {
    backgroundColor: "#fafafa",
    marginBottom: 15,
    borderRadius: 5,
  },

  button: {
    borderRadius: 10
  }
});