import React, { useState, useContext } from "react";
import { StyleSheet, Image, Platform } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppForm from "../components/AppForm";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import colors from "../config/colors";
import ErrorMessage from "../components/ErrorMessage";
import AuthContext from "../auth/context";
import authStorage from "../auth/authStorage";
import authApi from "../api/auth";
import jwtDecode from "jwt-decode";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import DEFS from "../config/defaults"


const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const [registerFailed, setRegisterFailed] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isPending, setIsPending] = useState(false);
  const authContext = useContext(AuthContext);

  const handleSubmit = async ({ name, email, password }) => {
    setIsPending(true);

    fetch(DEFS.baseUrl + '/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userEmail: email,
        name: name,
        pwd: password,
        lastSeen: ''
      })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Signup Rsponse", res.success)
        if (res.success === true) {
          console.log('User registered successfully!')

          authContext.setName((state) => name);
          authContext.setUser(JSON.stringify(res.data));
          authStorage.storeToken(res.data.uid);
          authStorage.storeLocalId(JSON.stringify(res.data));

          setErrMsg("");
          setRegisterFailed(false);
          setIsPending(false);
        } else {

          setIsPending(false);
          setErrMsg(res.message);
          setRegisterFailed(true);
        }
      })
      .catch((error) => {
        setIsPending(false)
        setErrMsg(error.message);
        setRegisterFailed(true);
        console.error(error)
      })
  };

  let noPadding = false;
  if (Platform.OS === "android") {
    noPadding = true;
  }
  return (
    <React.Fragment>
      <ActivityIndicator visible={isPending} />
      <Screen style={styles.container} noPadding={noPadding}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
        <AppForm
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={errMsg} visible={registerFailed} />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" color={colors.primary} />
        </AppForm>
      </Screen>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default RegisterScreen;
