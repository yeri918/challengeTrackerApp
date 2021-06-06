import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
} from "react-native";
import CalendarComponent from "../../components/calendar";
import TaskScreen from "../../components/TaskComponent";

import ActionSheet from "../../components/ActionSheet";
import AddTaskScreen from "../../app/screens/AddTaskScreen";

const { width, height } = Dimensions.get("screen");
function DisplayCalendar() {
  return (
    <SafeAreaView style={{ width, height }}>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <CalendarComponent />
      </SafeAreaView>
      <ActionSheet />
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function CalendarScreen(props) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Calendar"
          component={DisplayCalendar}
          options={{
            title: "Calendar",
            headerStyle: {
              backgroundColor: "orange",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="To Do"
          component={AddTaskScreen}
          options={{ headerStyle: { backgroundColor: "orange" } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "orange",
  },
});

export default CalendarScreen;
