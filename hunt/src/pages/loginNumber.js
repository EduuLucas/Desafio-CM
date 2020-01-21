import React from "react";
import { withFormik, ErrorMessage } from 'formik';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { login, signup } from "../api/api";
import * as yup from "yup";

const LoginNumber = (props) => (
   <View style={styles.container}>
    <TextInput
      style={styles.inputs}
      value={props.values.password}
      inlineImageLeft='imagesms'
      inlineImagePadding={25}
      placeholder="Number"
      onChangeText={text => props.setFieldValue('password', text)}
    />
    
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Send SMS</Text>
    </TouchableOpacity>
  </View>
);

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),

  // loginNumber: () => {
  //   this.props.navigation.navigate("LoginNumber");
  // }

  // validationSchema: yup.object().shape({
  //   email: yup.string()
  //     .email('Digite um e-mail válido')
  //     .required('Preencha o campo de e-mail'),
  //   password: yup.string()
  //     .min(8, 'A senha deve ter no mínimo 6 caracteres')
  //     .required('Preencha o campo de senha')
  // }),

  handleSubmit: (values) => {
    console.log(values);
  }
})(LoginNumber);

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

  button: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#7d5fff",
    borderRadius: 5,
    fontFamily: "Arial",
    justifyContent: "center",
    alignItems: "center"
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