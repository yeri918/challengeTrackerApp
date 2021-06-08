import React from "react";
import { ScrollView, View, Text } from "react-native";
import FriendsRanking from "../../components/FriendsRanking";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChallengeGroup from "../../components/ChallengeGroup";
import TestScreen from "./AddTaskScreen";
import NewChallengeGroup from "../../app/screens/NewChallengeGroup";

const Stack = createStackNavigator();

function FriendsTopList() {
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
        <FriendsRanking />
      </View>
      <View style={{ flex: 1 }}>
        <ChallengeGroup />
      </View>
    </View>
  );
}

function FriendsScreen() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Ranking"
          component={FriendsTopList}
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
