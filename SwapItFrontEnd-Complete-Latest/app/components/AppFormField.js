import React from "react";
import AppTextInput from "./AppTextInput";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const AppFormField = (props) => {
  const {
    errors,
    setFieldTouched,
    touched,
    setFieldValue,
    values,
  } = useFormikContext();

  return (
    <React.Fragment>
      <AppTextInput
        {...props}
        onChangeText={(text) => setFieldValue(props.name, text)}
        onBlur={() => setFieldTouched(props.name)}
        value={values[props.name]}
      />
      <ErrorMessage error={errors[props.name]} visible={touched[props.name]} />
    </React.Fragment>
  );
};

export default AppFormField;
