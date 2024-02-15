import React from "react";
import ImageInputList from "./ImageInputList";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";
import { View, StyleSheet, ToastAndroid } from "react-native";

const FormImagePicker = (props) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const addHandle = (uri) => {
    if (props.max != null) {
      if (values[props.name].length < props.max)
        setFieldValue(props.name, [...values[props.name], uri]);
        else
        ToastAndroid.show("Only "+props.max+' images are allowed to select!', ToastAndroid.SHORT);
    } else {
      setFieldValue(props.name, [...values[props.name], uri]);
    }

    console.log(values[props.name].length, props)
  };

  const removeHandle = (uri) => {
    setFieldValue(
      props.name,
      values[props.name].filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <View style={styles.container}>
      <ImageInputList
        imageURIs={values[props.name]}
        onAddImage={addHandle}
        onRemoveImage={removeHandle}
      />
      <ErrorMessage error={errors[props.name]} visible={touched[props.name]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

export default FormImagePicker;
