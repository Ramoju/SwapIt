import React from "react";
import { createStackNavigator, StackNavigator } from "@react-navigation/stack";
import ListingEditScreen from "../../screens/ListingEditScreen";

const Stack = createStackNavigator();

const AddFeedNavigator = () => (
  <Stack.Navigator >
    <Stack.Screen name="Add Post" component={ListingEditScreen} />
  </Stack.Navigator>
);

export default AddFeedNavigator;
