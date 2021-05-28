import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import { TouchableHighlight } from "react-native-gesture-handler";
import OneFriendRow from "../components/oneFriendRow";

function FriendsRanking() {
  return (
    <View style={styles.container}>
      <View style={styles.friendListTitle}>
        <Text style={{ fontSize: 20, color: "#555" }}>Motivation Ranking</Text>
      </View>
      <OneFriendRow name={"Annie Park"} percentage={90} />
      <OneFriendRow name={"Julie Park"} percentage={80} />
      <OneFriendRow name={"Daniel Kim"} percentage={60} />
      <OneFriendRow name={"Mary Lee   "} percentage={50} />
      <OneFriendRow name={"Tania Lim   "} percentage={30} />
    </View>

    //   <View style={{ flex: 1, backgroundColor: "#999999" }} />
  );
}
export default FriendsRanking;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    marginBottom: 20,
    marginTop: 5,
  },
  friendContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "orange",
    height: 60,
    width: "80%",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  friendListTitle: {
    height: "12%",
    width: "90%",
    backgroundColor: "#FFD283",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 30,
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "white" },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    fontWeight: "500",
  },
});
