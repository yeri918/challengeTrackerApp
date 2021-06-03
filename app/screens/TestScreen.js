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

import DateTimePicker from "@react-native-community/datetimepicker";

function Test() {
  const [task, setTask] = useState("Swimming");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(currentDate.toDateString());
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatePicker = () => {
    showMode("date");
  };
  const showTimePicker = () => {
    showMode("time");
  };

  return (
    // <View style={{ backgroundColor: "blue", flex: 1 }}>
    //   <View>
    //     <Button onPress={showDatepicker} title="Show date picker!" />
    //   </View>
    //   <View>
    //     <Button onPress={showTimepicker} title="Show time picker!" />
    //   </View>
    //   {show && (
    //     <DateTimePicker
    //       testID="dateTimePicker"
    //       value={date}
    //       mode={mode}
    //       is24Hour={true}
    //       display="default"
    //       onChange={onChange}
    //     />
    //   )}
    // </View>
    // Actual code written for the app
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
        borderRadius: 30,
      }}
    >
      {/* Takes the task */}
      <Text style={styles.title}>Task:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(val) => setTask(val)}
      />
      <Text>Task:{task}</Text>
      {/* <Text>{date}</Text> */}
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.title}>Date:</Text>
      </View>
      <TouchableOpacity
        onPress={showDatePicker}
        style={{ borderWidth: 1, borderColor: "black", borderRadius: 5 }}
      >
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={{ marginTop: 5, marginLeft: 10 }}
        />
      )}
      <Text>{date.toDateString()}</Text>
      <View>
        <Text style={styles.title}>Time:</Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={{ marginTop: 5, marginLeft: 10, width: 200 }}
          textColor="black"
        />
      )}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonTitle}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}
const Stack = createStackNavigator();

function TestScreen(props) {
  return (
    // <Test />
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="TakeInputs"
          component={Test}
          options={{
            title: "Test",
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
export default TestScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "orange",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 13,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  submitButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "orange",
    alignItems: "center",
    marginVertical: 7,
  },
  submitButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  title: { marginLeft: 10, marginTop: 10, fontSize: 20 },
});
