import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const ActivityIndicator = (props) => {
  if (!props.visible) return null;
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loader.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    opacity: 0.4,
    position: "absolute",
  },
});

export default ActivityIndicator;
