import "react-native-gesture-handler"; //https://reactnavigation.org/docs/getting-started
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./navigation/tabs";
import LoginScreen from "./app/screens/LoginScreen";
import LoadingScreen from "./app/screens/LoadingScreen";

import * as firebase from "firebase";
import ApiKeys from "./constants/ApiKeys";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AddTaskScreen from "./app/screens/AddTaskScreen";

// const Stack = createStackNavigator();

const AppScreen = ({ navigation, route }) => {
  console.log("check 3 - AppScreen", navigation.state.params.uid);
  // console.log("check 3", route);
  return (
    <NavigationContainer>
      <MyTabs uid={navigation.state.params.uid}></MyTabs>
    </NavigationContainer>
    // <AppNavigator />
  );
};
export default function App() {
  console.log("App executed");

  // const handlePressed = () => console.log("Text Pressed");
  if (firebase.apps.length === 0) {
    console.log("firebase initialized");
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  } else {
    console.log("else firebase");
  }

  const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: LoadingScreen,
    LoginScreen: LoginScreen,
    AppScreen: { screen: AppScreen },
  });

  const AppNavigator = createAppContainer(AppSwitchNavigator);

  return (
    // <NavigationContainer>
    //   <MyTabs></MyTabs>
    // </NavigationContainer>
    <AppNavigator />
  );
}
