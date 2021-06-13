import React, { useState } from "react";
import { View } from "react-native";
import AddTask from "../../components/AddTask";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
function AddTaskScreen({ uid }) {
  return (
    // <NavigationContainer independent={true}>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Add"
    //       component={AddTask}
    //       options={{
    //         title: "Add a Task",
    //         headerStyle: {
    //           backgroundColor: "orange",
    //         },
    //         headerTintColor: "#fff",
    //       }}
    //     />
    //     <Stack.Screen
    //       name="Calendar"
    //       component={CalendarScreen}
    //       options={{ headerStyle: { backgroundColor: "orange" } }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <View>
      <AddTask uid={uid} />
    </View>
  );
}

export default AddTaskScreen;
