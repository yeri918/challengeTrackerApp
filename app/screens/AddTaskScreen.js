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

// function AddTaskScreen() {
//   const renderContent = () => (
//     <View style={{ backgroundColor: "green", padding: 16, height: 450 }}>
//       <Text>Swipe down to close</Text>
//     </View>
//   );

//   const sheetRef = React.useRef(null);

//   return (
//     <View style={{ backgroundColor: "blue", flex: 1 }}>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "papayawhip",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Button
//           title="Open Bottom Sheet"
//           onPress={() => sheetRef.current.snapTo(0)}
//         />
//       </View>
//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={[450, 0, 0]}
//         borderRadius={10}
//         renderContent={renderContent}
//       />
//     </View>
//   );
// }

// export default AddTaskScreen;

function TakeInputs() {
  const [task, setTask] = useState("Swimming");

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHeader}></View>
      </View>
    </View>
  );

  const bs = React.useRef(null);
  const fall = new Animated.Value(1);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
      }}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Button
          title="Open Bottom Sheet"
          onPress={() => bs.current.snapTo(0)}
        />
        {/* <TouchableOpacity onPress={() => bs.current.snapTo(0)}> */}
        {/* <TouchableOpacity> */}
        {/* <View style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </View>
        </TouchableOpacity> */}
        {/* <Text style={{ marginLeft: 30, marginTop: 10 }}>Task:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => setTask(val)} */}
        {/* /> */}
      </View>
      {/* <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={{ marginLeft: 10, marginTop: 10 }}>Date:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => setTask(val)}
        />
      </View> */}
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0, 0]}
        renderContent={renderContent}
        // renderHeader={this.renderHeader}
        initialSnap={1}
        // callbackNode={this.fall}
        // enabledGestureInteraction={true}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function AddTaskScreen(props) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="TakeInputs"
          component={TakeInputs}
          options={{
            title: "Add a Task",
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

export default AddTaskScreen;
