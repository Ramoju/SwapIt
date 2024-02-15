import React from "react";
import { createStackNavigator, StackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../screens/AccountScreen";
import MessagesScreen from "../../screens/MessagesScreen";
import UnderDevelopment from "../../screens/UnderDevelopment";
import ListingsScreen from "../../screens/ListingsScreen";
import WishListingsScreen from "../../screens/WishListingsScreen";
import Chat from "../../screens/Chat";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator >
    <Stack.Screen name="Account" component={AccountScreen} />

    <Stack.Screen name="MyListings" component={ListingsScreen} />

    <Stack.Screen name="Messages" component={MessagesScreen} />

    <Stack.Screen name="WishList" component={WishListingsScreen} />

    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
);

export default AccountNavigator;
