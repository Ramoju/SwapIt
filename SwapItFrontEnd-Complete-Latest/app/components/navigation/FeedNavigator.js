import React from "react";
import { createStackNavigator, StackNavigator } from "@react-navigation/stack";
import UnderDevelopent from '../../screens/UnderDevelopment'
import ListingsScreen from '../../screens/ListingsScreen'
import ListingDetailsScreen from '../../screens/ListingDetailsScreen'
import Chat from "../../screens/Chat";
const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="UserListing" component={ListingsScreen} />
    <Stack.Screen name="NewChat" component={Chat} />

  </Stack.Navigator>
);

export default FeedNavigator;
