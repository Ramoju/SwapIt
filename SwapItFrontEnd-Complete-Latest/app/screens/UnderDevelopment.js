import { StatusBar } from 'expo-status-bar';
import React, { useContext } from "react";
import { View, StyleSheet, Platform, Alert, Text } from "react-native";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import Icon from "../components/Icon";
import AuthContext from "../auth/context";
import authStorage from "../auth/authStorage";
export default function UnderDevelopment() {

    const { user, setUser, name, setName } = useContext(AuthContext);

    let noPadding = false;
    if (Platform.OS === "android") {
        noPadding = true;
    }

    const handleLogout = () => {
        setUser((state) => null);
        authStorage.removeToken();
        setName((state) => null);
    };

    const handleClick = () => {
        Alert.alert("Logout", "Are you sure!", [
            { text: "Yes", onPress: handleLogout },
            { text: "No" },
        ]);
    };

    return (
        <Screen style={styles.screen} noPadding={noPadding}>
            <View style={styles.container}>
                <Text>Under Development</Text>
                <StatusBar style="auto" />
            </View>
            <View style={styles.container}>
                <ListItem
                    title="Logout"
                    IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
                    click={handleClick}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});