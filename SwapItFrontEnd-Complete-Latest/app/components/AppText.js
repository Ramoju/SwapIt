import React from "react";
import { Text } from "react-native";
import defaultStyle from "../config/styles";

const AppText = (props) => {
  return (
    <Text style={[defaultStyle.text, props.style]} {...props}>
      {props.children}
    </Text>
  );
};

export default AppText;
