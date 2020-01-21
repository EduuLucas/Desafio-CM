import React from "react";
import { history } from "../../history";

import { Formik, Form, Field } from "formik";

import "./styles.css"

import Image1 from "../../resources/images/github.gif";

const userSelect = () => {
  const handleSubmit = async values => {
    localStorage.setItem("user", values.user);
    history.push("/user");
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
            <label>Insira o usuário</label><br/>
            <Field name="user" className="user"></Field><br/>
            <button className="Form-btn" type="submit">Pesquisar</button>
          </Form>
        </div>
      </Formik>
    </>
  );
}

export default userSelect;