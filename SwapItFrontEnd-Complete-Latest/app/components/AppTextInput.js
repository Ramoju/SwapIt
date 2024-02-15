import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import defaultStyle from "../config/styles";

const AppTextInput = (props) => {
  return (
    <View style={styles.container}>
      {props.icon && (
        <MaterialCommunityIcons
          name={props.icon}
          style={styles.icon}
          size={25}
          color={colors.medium}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        {...props}
        styles={defaultStyle.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
