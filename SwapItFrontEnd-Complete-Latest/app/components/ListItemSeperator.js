import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

const ListItemSeperator = () => {
  return <View style={styles.seperator}></View>;
};

const styles = StyleSheet.create({
  seperator: {
    width: "100%",
    height: 2,
    backgroundColor: colors.light,
  },
});

export default ListItemSeperator;
