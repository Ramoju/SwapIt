import React, { useEffect } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { TouchableWithoutFeedback } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { arrayBufferToBase64 } from "../screens/ListingsScreen";

const ImageInput = (props) => {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (!result.granted) {
      alert("You need to allow request");
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        quality: 0.5,
      });
      if (!result.cancelled) {
        // props.onChangeImage(result.uri);
        let res = result.uri.split('.');
        let imageExtenstion = res[res.length - 1];
        let imageType = `${result.type}/${imageExtenstion}`;
        var imageData = {
          uri: result.uri,
          data: result.base64,
          contentType: imageType
        }
        props.onChangeImage(imageData);
        // console.log(result.base64)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageClicked = () => {
    if (!props.imageURI) {
      selectImage();
    } else {
      Alert.alert("Delete", "Are you sure you want to delete this?", [
        { text: "Yes", onPress: () => props.onChangeImage(null) },
        { text: "No" },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={imageClicked}>
      <View style={styles.container}>
        {!props.imageURI && (
          <MaterialCommunityIcons name="camera" size={40} color={colors.dark} />
        )}
        {props.imageURI && (
          <Image style={styles.image} source={{ uri: props.imageURI.uri }} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageInput;
