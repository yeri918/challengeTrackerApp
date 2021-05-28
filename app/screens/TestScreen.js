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
  // const [modeTime, setModeTime] = useState("time");
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };
  const showTimepicker = () => {
    showMode("time");
  };

  const renderContent = () => (
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
      {/* <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 20 }}>
        {date}
      </Text> */}
      {/* Done button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonTitle}>Done</Text>
      </TouchableOpacity>
    </View>
  );

  const sheetRef = React.useRef(null);
  return (
    <View style={{ backgroundColor: "blue", flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "papayawhip",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[520, 0, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
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
