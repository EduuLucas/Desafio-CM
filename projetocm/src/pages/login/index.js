import React from "react";
import axios from "axios";
import { history } from "../../history";
import * as yup from "yup";
import { useToasts } from 'react-toast-notifications';

import { ErrorMessage, Formik, Form, Field } from "formik";

import "./styles.css"

import Image1 from "../../resources/images/github.gif";



const Login = () => {
  const { addToast } = useToasts();
  
  const handleSubmit = values => {
      axios.post("http://localhost:8080/v1/api/auth", values)
      .then(resp => {
        const { data } = resp;
        if (data) {
          localStorage.setItem("token", data);
          history.push("/select");
          addToast("Logado com sucesso", {
            appearance: "success",
            autoDismiss: true
          })
        }
      })
      .catch(error => {
        addToast("Email ou senha incorretos", {
          appearance: "error",
          autoDismiss: true
        })
      });
  }
  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })

  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <div className="body">
          <Form className="form">
            <img alt="teste" src={Image1} className="image-form"/><br/>
            <Field placeholder="email" name="email" className="email"></Field><br/>
            <ErrorMessage 
              className="Form-Error"
              name="email"
              component="label"
            >
            </ErrorMessage>
            <Field placeholder="senha" name="password" type="password" className="password"></Field><br/>
            <ErrorMessage 
              className="Form-Error"
              name="password"
              component="label"
            >
            </ErrorMessage>
            <a href="http://localhost:3000/register">Novo por aqui? Registre-se!</a>
            <button className="Form-btn" type="submit">Entrar</button>
          </Form>
        </div>
      </Formik>
    </>
  );
}

export default Login;