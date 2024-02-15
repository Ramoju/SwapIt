import React, { useState, useEffect } from "react";
import Screen from "./app/components/Screen";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AuthNavigator from "./app/components/navigation/AuthNavigation";
import navigationTheme from "./app/components/navigation/navigationTheme";
import AppNavigator from "./app/components/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/authStorage";
import jwtDecode from "jwt-decode";
import { AppLoading } from "expo";

export default function App() {
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [token, setToken] = useState("");
  const [local, setLocal] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    accessToken();
  }, []);
  const accessToken = async () => {
    const token = await authStorage.getToken();
    const local = await authStorage.getLocalId();
    if (!token) return;
    setLocal((state) => local);
    setToken((state) => token);
    const user = await authStorage.getToken();;
    setUser((state) => user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        name,
        setName,
        local,
      }}
    >
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );

}