import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import CalendarComponent from "../../components/calendar";
import TaskScreen from "../../components/TaskComponent";

function DisplayCalendar() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <CalendarComponent />
      </View>
      <View style={{ flex: 1, backgroundColor: "gray" }}>
        <TaskScreen />
      </View>
    </View>
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
