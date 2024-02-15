import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListingEditScreen from "../../screens/ListingEditScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewListingButton from "./NewListingButton";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import AddFeedNavigator from "./AddFeedNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useEffect(() => {
    //registerForPushNotification();
  }, []);
  /*  */
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 15,
        },
        style: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 20,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="home"
              color={props.color}
              size={props.size}
            />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="ListingEdit"
        component={AddFeedNavigator}
        options={(props) => ({
          tabBarButton: () => (
            <NewListingButton
              navBtnClick={() => props.navigation.navigate("ListingEdit")}
            />
          ),
          headerShown: false
        })}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountNavigator}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              name="account"
              color={props.color}
              size={props.size}
            />
          ),
          headerShown: false,
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
