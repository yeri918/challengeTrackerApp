import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import ProfileDesign from "../../components/ProfileDesign";
import firebase from "firebase";

function setProfile(props) {
  return <ProfileDesign uid={props.route.params.userid} />;
}

const Stack = createStackNavigator();

function ProfileScreen(props) {
  const [uid, setUid] = useState(props.route.params.userID);
  console.log("ProfileScreen:", props.route.params.userID);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="TakeInputs"
          component={setProfile}
          initialParams={{ userid: uid }}
          options={{
            title: "Profile",
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
});

export default ProfileScreen;
