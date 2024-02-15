import { View, StyleSheet, TouchableOpacity,Image } from "react-native";
import React from "react";
//import {  } from "react-native-expo-image-cache";

import AppText from "./AppText";
import colors from "../config/colors";
import Icon from "./Icon";

import SubmitButton from "../components/SubmitButton";
import AppButton from "./AppButton";

function Card(props) {


  return (
    <TouchableOpacity onPress={props.cardPressed}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: props.image }}
          resizeMode='cover'
        />
        {props.isSold && (<AppText style={styles.soldText} numberOfLines={1} ellipsizeMode='tail'>Sold</AppText>)}

        <View style={styles.container}>
          <TouchableOpacity onPress={props.handleClick}>
            <Icon
              backgroundColor={props.category.backgroundColor}
              name={props.category.icon}
              size={40}
              iconColor="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{props.title}</AppText>
          <AppText style={styles.subTitle} numberOfLines={1} ellipsizeMode='tail'>{props.subTitle}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    width: '100%'
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 150,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 5,
  },
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  text: {
    marginTop: 5,
  },
  soldText: {
    color: colors.white,
    fontSize: 14,
    margin: 15,
    textTransform: "uppercase",
    borderRadius: 5,
    alignContent: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    position: 'absolute',
    backgroundColor: 'red'
  }
});

export default Card;
