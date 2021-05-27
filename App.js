import "react-native-gesture-handler"; //https://reactnavigation.org/docs/getting-started
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  SafeAreaView,
  Button,
} from "react-native";
import CalendarScreen from "./app/screens/CalendarScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./navigation/tabs";
import { Ionicons } from "@expo/vector-icons";

//Returns the Calendar screen
function Calendar() {
  return <CalendarScreen></CalendarScreen>;
}

//Returns the Login screen
function Login() {
  return <WelcomeScreen></WelcomeScreen>;
}

//Test with a button navigating to Calendar Screen
function Test({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Test</Text>
      <Button
        title="Go to calendar screen"
        onPress={() => navigation.navigate("Calendar")}
      />
    </View>
  );
}
const Stack = createStackNavigator();

export default function App() {
  console.log("App executed");

  // const handlePressed = () => console.log("Text Pressed");

  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        initialRouteName="Test"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#009387",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Test"
          component={Test}
          options={{ title: "Hello" }}
        />
        <Stack.Screen name="Welcome!" component={Login} />
        <Stack.Screen name="Calendar" component={Calendar} />
      </Stack.Navigator> */}
      <MyTabs></MyTabs>
    </NavigationContainer>
  );
}
