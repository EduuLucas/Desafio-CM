import React from 'react';
import axios from "axios";
import { history } from "../../history"

import { Formik, Form, Field } from "formik";

import "./styles.css"

import Image1 from "../../resources/images/github.gif";

// import { Container } from './styles';

const Register = () => {
  const handleSubmit = values => {
    axios.post("http://localhost:8080/v1/api/user", values)
      .then(resp => {
        const { data } = resp;
        if (data) {
          localStorage.setItem("token", data);
          history.push("/auth");
        }
      });
  }
  // const validations = yup.object().shape({
  //   email: yup.string().email().required(),
  //   password: yup.string().min(8).required
  // })

  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        // validationSchema={validations}
      >
        <div className="body">
          <Form className="form">
            <img alt="teste" src={Image1} className="image-form"/><br/>
            <label>Nome</label>
            <Field name="firstName" className="firstName"></Field><br/>
            <label>Sobrenome</label>
            <Field name="lastName" className="lastName"></Field><br/>
            <label>Email</label>
            <Field name="email" className="email"></Field><br/>
            {/* <ErrorMessage
              component="span"
              name="email"
              className="ID-input"
            /> */}
            <label>Senha</label>
            <Field name="password" type="password" className="password"></Field><br/>
            {/* <ErrorMessage
              component="span"
              name="Senha-input"
              className="Form-Error"
            /> */}
            <button className="Form-btn" type="submit">Registrar</button>
          </Form>
        </div>
      </Formik>
    </>
  );
}

export default Register;
