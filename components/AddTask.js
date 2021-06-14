import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  Sli,
  ScrollView,
} from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Fontisto } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import firebase from "firebase";

function Icon() {
  return (
    <Fontisto
      name="propeller-4"
      size={25}
      style={{
        justifyContent: "center",
        alignSelf: "center",
        // borderWidth: 2,
        // borderColor: "red",
        marginTop: 8,
        marginLeft: 5,
        color: "orange",
        opacity: 0.5,
      }}
    />
  );
}
function AddTask({ uid }) {
  const [task, setTask] = useState("No Task");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  // const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [noTime, setNoTime] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  // const [count, setCount] = useState(0);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(currentDate.toDateString());
    setShow(Platform.OS === "ios");
    if (!show) {
      console.log("false show");
    }
    setDate(currentDate);
  };

  const onChangeStartTime = (event, selectedStartTime) => {
    const currentTime = selectedStartTime || startTime;
    // console.log(currentDate.toDateString());
    setShow(Platform.OS === "ios");
    // if (!show) {
    //   console.log("false show");
    // }
    setStartTime(currentTime);
  };

  const onChangeEndTime = (event, selectedEndTime) => {
    const currentTime = selectedEndTime || endTime;
    // console.log(currentDate.toDateString());
    setShow(Platform.OS === "ios");
    // if (!show) {
    //   console.log("false show");
    // }
    setEndTime(currentTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    // setMode(currentMode);
  };
  const showDatePicker = () => {
    // setShow(true);
    // console.log("date pressed");
    // setMode("date");
    // showMode("date");
    setShow(true);
    setShowDate(true);
    setShowStartTime(false);
    setShowEndTime(false);
  };
  const showStartTimePicker = () => {
    // showMode("time");
    setShow(true);
    setShowStartTime(true);
    setShowDate(false);
    setShowEndTime(false);
  };

  const showEndTimePicker = () => {
    // showMode("time");
    setShow(true);
    setShowStartTime(false);
    setShowDate(false);
    setShowEndTime(true);
  };

  const onValueChange = (difficulty) => {
    setDifficulty(difficulty);
  };

  const setData = () => {
    firebase
      .firestore()
      .collection("todo")
      .add({
        uid: uid,
        task: task,
        date: date,
        startTime: startTime,
        endTime: endTime,
        noTime: noTime,
        difficulty: difficulty,
        completion: false,
      })
      .then(function () {
        console.log("AddTask- setData successful");
      })
      .catch(function (e) {
        console.log("AddTask-error", e);
      });
  };

  const navigation = useNavigation();
  return (
    // <ScrollView style={{ height: "100%" }}>
    <ScrollView
      style={{
        backgroundColor: "white",
        padding: 16,
        height: "100%",
        // borderColor: "red",
        // borderWidth: 5,
        // borderRadius: 30,
      }}
    >
      {/* Takes the task */}
      <View style={{ flexDirection: "row" }}>
        <Icon />
        <Text style={styles.title}>Task:</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={(val) => setTask(val)}
        placeholder="e.g. Finish DNA essay first draft"
      />
      <View style={{ flexDirection: "row" }}>
        <Icon />
        <Text style={styles.title}>Date:</Text>
      </View>

      <TouchableOpacity
        onPress={showDatePicker}
        style={[
          {
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            width: "50%",
          },
          styles.textInput,
        ]}
      >
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {show && showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
          style={{ marginTop: 5, marginLeft: 10 }}
        />
      )}
      <View style={{ flexDirection: "row" }}>
        <Icon />
        <Text style={styles.title}>Time</Text>
      </View>
      {/* <Text>{date.toDateString()}</Text> */}
      <View style={{ flexDirection: "column", marginTop: 5, marginLeft: 5 }}>
        <View>
          <Text style={{ fontSize: 15, marginLeft: 12 }}>From:</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={showStartTimePicker}
            style={[
              {
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 5,
                width: "30%",
              },
              styles.textInput,
            ]}
          >
            <Text>{startTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {show && showStartTime && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startTime}
              mode={"time"}
              is24Hour={true}
              display="default"
              onChange={onChangeStartTime}
              style={{ marginTop: 5, marginLeft: 10, width: 200 }}
              textColor="black"
            />
          )}
        </View>
        <View>
          <Text style={{ fontSize: 15, marginLeft: 12 }}>To:</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={showEndTimePicker}
            style={[
              {
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 5,
                // padding: 10,
                width: "30%",
              },
              styles.textInput,
            ]}
          >
            <Text>{endTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {show && showEndTime && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startTime}
              mode={"time"}
              is24Hour={true}
              display="default"
              onChange={onChangeEndTime}
              style={{ marginTop: 5, marginLeft: 10, width: 200 }}
              textColor="black"
            />
          )}
        </View>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 20 }}>
        <TouchableOpacity onPress={() => setNoTime(!noTime)}>
          {noTime ? (
            <Fontisto name="checkbox-active" size={20} />
          ) : (
            <Fontisto name="checkbox-passive" size={20} />
          )}
        </TouchableOpacity>
        <Text style={{ marginLeft: 5 }}>Full Day</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Icon />
        <Text style={styles.title}>Level of Difficulty: {difficulty}</Text>
      </View>
      <Slider
        style={{ width: "70%", height: 50 }}
        minimumValue={1}
        maximumValue={5}
        step={1}
        minimumTrackTintColor="orange"
        maximumTrackTintColor="#000"
        value={difficulty}
        onValueChange={onValueChange}
      />
      <TouchableOpacity
        onPress={() => {
          alert("Added to your calendar"), setData();
        }}
        // onPress={() => console.log(uid)}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonTitle}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default AddTask;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "orange",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 7,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 40,
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
  title: {
    marginLeft: 5,
    marginTop: 5,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "blue",
  },
});
