import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import CalendarComponent from "../../components/calendar";
import TaskScreen from "../../components/TaskComponent";
import TestScreen from "../../app/screens/TestScreen";

function DisplayCalendar() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <CalendarComponent />
      </SafeAreaView>
      <View style={{ flex: 1, backgroundColor: "gray" }}>
        <TaskScreen date={new Date("2021-05-31")} />
      </View>
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
        <Stack.Screen name="Add" component={TestScreen} />
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
