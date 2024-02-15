import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

const ImageInputList = ({ imageURIs = [], onRemoveImage, onAddImage }) => {
  const scrollref = useRef();
  return (
    <View>
      <ScrollView
        ref={scrollref}
        horizontal={true}
        onContentSizeChange={() => scrollref.current.scrollToEnd()}
        decelerationRate="normal"
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          {imageURIs.map((imageURI, index) => (
            <View key={index} style={styles.image}>
              <ImageInput
                imageURI={imageURI}
                onChangeImage={(uri) => onRemoveImage(imageURI)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
