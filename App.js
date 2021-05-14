import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import CalendarScreen from "./app/screens/CalendarScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Returns the Calendar screen
function Calendar() {
  return <CalendarScreen></CalendarScreen>;
}

//Returns the Login screen
function Login() {
  return <WelcomeScreen></WelcomeScreen>;
}

const Stack = createStackNavigator();

export default function App() {
  console.log("App executed");

  // const handlePressed = () => console.log("Text Pressed");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome!">
        <Stack.Screen name="Welcome!" component={Login} />
        <Stack.Screen name="Calendar" component={Calendar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
