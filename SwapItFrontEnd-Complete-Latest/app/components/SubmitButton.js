import React from "react";
import { useFormikContext } from "formik";
import AppButton from "./AppButton";

const SubmitButton = (props) => {
  const { handleSubmit } = useFormikContext();

  return <AppButton {...props} buttonPressed={handleSubmit} />;
};

export default SubmitButton;
