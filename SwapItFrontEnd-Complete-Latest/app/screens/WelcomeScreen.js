import React from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";

import colors from "../config/colors";
import AppButton from "../components/AppButton";

function WelcomeScreen(props) {
  return (
    <ImageBackground
      blurRadius={5}
      style={styles.background}
      source={require("../assets/chair.jpg")}
    >
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.tagline}>Exchange What You Don't Need</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="login"
          color={colors.primary}
          buttonPressed={() => props.navigation.navigate("Login")}
        />
        <AppButton
          title="register"
          color={colors.secondary}
          buttonPressed={() => props.navigation.navigate("Register")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode:'contain'
  },
  container: {
    position: "absolute",
    top: 70,
    padding: 1,
    alignItems: "center",
  },
  tagline: {
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 10,
  },
});

export default WelcomeScreen;
