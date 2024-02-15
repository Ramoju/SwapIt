import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Image, Platform } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import * as Yup from "yup";

import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import AppForm from "../components/AppForm";
import ErrorMessage from "../components/ErrorMessage";

import authApi from "../api/auth";
import jwtDecode from "jwt-decode";
import AuthContext from "../auth/context";
import authStorage from "../auth/authStorage";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import DEFS from "../config/defaults"

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const LoginScreen = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const authContext = useContext(AuthContext);

  const [isPending, setIsPending] = useState(false);

  let noPadding = false;
  if (Platform.OS === "android") {
    noPadding = true;
  }

  const handleSubmit = async ({ email, password }) => {
    setIsPending(true);

    fetch(DEFS.baseUrl + '/users/byEmail/' + email, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pwd: password,
      })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Login Rsponse", res.success)
        if (res.success === true) {
          console.log('User Login successfully!')

          authContext.setName((state) => res.data.name);
          authContext.setUser(JSON.stringify(res.data));
          authStorage.storeToken(res.data.uid);
          authStorage.storeLocalId(JSON.stringify(res.data));

          setErrMsg("");
          setLoginFailed(false);
          setIsPending(false);
        } else {

          setIsPending(false);
          setErrMsg(res.message);
          setLoginFailed(true);
        }
      })
      .catch((error) => {
        setIsPending(false)
        setErrMsg(error.message);
        setLoginFailed(true);
        console.error(error)
      })
  };

  return (
    <React.Fragment>
      <ActivityIndicator visible={isPending} />
      <Screen style={styles.container} noPadding={noPadding}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />

        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={errMsg} visible={loginFailed} />
          <AppFormField
            placeholder="Email"
            icon="email"
            name="email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <AppFormField
            placeholder="Password"
            icon="lock"
            name="password"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true}
          />
          <SubmitButton color={colors.primary} title="Login" />
        </AppForm>
      </Screen>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  container: {
    padding: 10,
  },
});

export default LoginScreen;
