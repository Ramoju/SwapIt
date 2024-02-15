import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Icon(props) {
  return (
    <View
      style={{
        width: props.size ? props.size : 40,
        height: props.size ? props.size : 40,
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#000",
        borderRadius: props.size ? props.size / 2 : 40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name={props.name}
        color={props.iconColor}
        size={props.size ? props.size / 2 : 40 / 2}
      />
    </View>
  );
}
