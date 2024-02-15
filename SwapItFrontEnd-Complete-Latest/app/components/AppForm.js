import React from "react";
import { View, Text } from "react-native";
import { Formik } from "formik";

const AppForm = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={props.validationSchema}
    >
      {() => <React.Fragment>{props.children}</React.Fragment>}
    </Formik>
  );
};

export default AppForm;
