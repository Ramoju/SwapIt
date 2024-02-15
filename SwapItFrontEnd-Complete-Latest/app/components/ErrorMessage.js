import React from "react";
import { StyleSheet } from "react-native";
import AppText from "./AppText";

const ErrorMessage = (props) => {
  if (!props.visible || !props.error) return null;
  return <AppText style={styles.error}>{props.error}</AppText>;
};

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

export default ErrorMessage;
