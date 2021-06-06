import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import AddTask from "../../components/AddTask";
import CalendarScreen from "../../app/screens/CalendarScreen";

const Stack = createStackNavigator();

function AddTaskFullScreen(props) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Add"
          component={AddTask}
          options={{
            title: "To Do",
            headerStyle: {
              backgroundColor: "orange",
            },
            headerTintColor: "#fff",
          }}
        />
        {/* <Stack.Screen name="Calendar" component={CalendarScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "orange",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 400,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 90,
    backgroundColor: "white",
    marginTop: 5,
    borderWidth: 1,
  },
  buttonText: {
    color: "#7f7f7f",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});

export default AddTaskFullScreen;
