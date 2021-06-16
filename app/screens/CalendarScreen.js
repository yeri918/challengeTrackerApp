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
import CalendarComponent from "../../components/Calendar";
import TaskScreen from "../../components/TaskComponent";

import ActionSheet from "../../components/ActionSheet";
import AddTaskScreen from "../../app/screens/AddTaskScreen";
import { useState } from "react/cjs/react.development";

const { width, height } = Dimensions.get("screen");
function DisplayCalendar(props) {
  console.log("DisplayCalendar", props.route.params.uid);
  return (
    // <SafeAreaView style={{ width, height }}>
    //   <SafeAreaView style={{ backgroundColor: "white" }}>
    <CalendarComponent uid={props.route.params.uid} />
    // </SafeAreaView>
    // <ActionSheet uid={props.route.params.uid} />
    // </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function CalendarScreen(props) {
  const [uid, setUid] = useState(props.route.params.uid);
  console.log("Calendar screen", props.route.params.uid);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Calendar"
          component={DisplayCalendar}
          initialParams={{ uid: uid }}
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
          initialParams={{ uid: props.route.params.uid }}
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
