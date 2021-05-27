import React from "react";
import { ScrollView, View, Text } from "react-native";

function FriendsScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* <Text style={{ color: "red" }}>Hi</Text>
      <View style={{ backgroundColor: "blue" }}></View> */}
      <View style={{ flex: 1, backgroundColor: "red" }} />
      <View style={{ flex: 2, backgroundColor: "green" }} />
    </View>
  );
}

export default FriendsScreen;
