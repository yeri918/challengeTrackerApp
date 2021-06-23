import React from "react";
import { ScrollView, View, Text } from "react-native";
import FriendsRanking from "../../components/FriendsRanking";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChallengeGroup from "../../components/ChallengeGroup";
import TestScreen from "./AddTaskScreen";
import NewChallengeGroup from "../../app/screens/NewChallengeGroup";

const Stack = createStackNavigator();

function FriendsTopList(props) {
  console.log("FriendsTopList", props.route.params.uid);
  return (
    <View style={{ flex: 1, backgroundColor: "#FFB554" }}>
      {/* <Text style={{ color: "red" }}>Hi</Text>
      <View style={{ backgroundColor: "blue" }}></View> */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFB554",
          borderColor: "orange",
          borderWidth: 3,
          borderRadius: 5,
        }}
      >
        <FriendsRanking uid={props.route.params.uid} />
      </View>
      <View style={{ flex: 1 }}>
        <ChallengeGroup />
      </View>
    </View>
  );
}

function FriendsScreen(props) {
  console.log("FriendsScreen", props.route.params.uid);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Ranking"
          component={FriendsTopList}
          initialParams={{ uid: props.route.params.uid }}
          options={{
            title: "Ranking",
            headerStyle: {
              backgroundColor: "orange",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Add"
          component={NewChallengeGroup}
          options={{
            title: "New Group",
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

export default FriendsScreen;
