import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";

const PickerItem = (props) => {
  return (
    <TouchableOpacity onPress={props.handleClick}>
      <AppText style={styles.text}>{props.item.label}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 20,
    fontWeight: "700",
  },
});

export default PickerItem;
