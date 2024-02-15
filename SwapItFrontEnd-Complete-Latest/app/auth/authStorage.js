import * as SecureStorage from "expo-secure-store";
//import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';
const key = "authTOken";
const storeToken = async (token) => {
  console.log("atorToken");
  try {
    await SecureStorage.setItemAsync(key, token);
  } catch (error) {
    console.log(error, "authStorage[storeToken]");
  }
};

const getToken = async () => {
  console.log("getToken");
  try {
    const token = await SecureStorage.getItemAsync(key);
    return token;
  } catch (error) {
    console.log(error, "authStorage[getToken]");
  }
};

const removeToken = async () => {
  console.log("removeToken");
  try {
    await SecureStorage.deleteItemAsync(key);
    await AsyncStorage.removeItem("expirationDate");
    await SecureStorage.deleteItemAsync("localId");
  } catch (error) {
    console.log(error, "authStorage[removeToken]");
  }
};

const storeExpirationDate = async (date) => {
  console.log("storeExpiration");
  try {
    await AsyncStorage.setItem("expirationDate", JSON.stringify(date));
  } catch (error) {
    console.log(error, "authStorage[storeExpirationDate]");
  }
};

const storeLocalId = async (localId) => {
  console.log("storeLocalId");
  try {
    await SecureStorage.setItemAsync("localId", localId);
  } catch (error) {
    console.log(error, "authStorage[storeLocalId]");
  }
};

const getLocalId = async () => {
  console.log("getLocal");
  try {
    const token = await SecureStorage.getItemAsync("localId");
    return token;
  } catch (error) {
    console.log(error, "authStorage[getLocalId]");
  }
};

const getExpirationDate = async () => {
  try {
    const value = await AsyncStorage.getItem("expirationDate");
    const token = await JSON.parse(value);
    console.log(token);
    return token;
  } catch (error) {
    console.log(error, "authStorage[getToken]");
  }
};

export default {
  storeToken,
  getToken,
  removeToken,
  storeExpirationDate,
  storeLocalId,
  getLocalId,
  getExpirationDate,
};
