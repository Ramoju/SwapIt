import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NewListingButton = (props) => {
  return (
    <TouchableOpacity onPress={props.navBtnClick}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          size={50}
          color={colors.white}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    bottom: 40,
    borderColor: colors.white,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NewListingButton;
