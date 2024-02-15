import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../config/colors";

const AppButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.buttonPressed}
      style={[styles.button, { backgroundColor: props.color }]}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default AppButton;
