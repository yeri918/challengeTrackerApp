import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, FlatList } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";

import { color } from "react-native-reanimated";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import OneFriendRow from "../components/oneFriendRow";
import { FontAwesome } from "@expo/vector-icons";
import OneFriend from "../components/OneFriend";

const { width, height } = Dimensions.get("window");
function FriendsRanking() {
  const [group, setGroup] = useState([
    { id: "1", name: "Julie Park", point: 57 },
    { id: "2", name: "Annie Park", point: 51 },
    { id: "3", name: "Gabby Kwon", point: 48 },
    { id: "4", name: "Michelle Byun", point: 35 },
    { id: "5", name: "Grace Jung", point: 10 },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.friendListTitle}>
        <FontAwesome name="superpowers" size={20} style={{ marginLeft: 10 }} />
        <Text
          style={{
            fontSize: 17,
            color: "#000",
            marginLeft: 10,
          }}
        >
          Motivation Ranking
        </Text>
      </View>
      <FlatList
        data={group}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.friendContainer}>
              <OneFriend item={item} index={index} />
            </View>
          );
        }}
      />
      {/* <OneFriendRow rank={1} name={"Annie Park"} percentage={90} />
      <OneFriendRow rank={2} name={"Julie Park"} percentage={80} />
      <OneFriendRow rank={3} name={"Daniel Kim"} percentage={60} />
      <OneFriendRow rank={4} name={"Mary Lee   "} percentage={50} />
      <OneFriendRow rank={5} name={"Tania Lim   "} percentage={30} /> */}
    </View>

    //   <View style={{ flex: 1, backgroundColor: "#999999" }} />
  );
}
export default FriendsRanking;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB554",
    flex: 1,
    flexDirection: "column",
  },
  friendContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: "white",
    height: height * 0.08,
    padding: 20,
    marginBottom: 5,
    marginTop: 0,
  },
  friendListTitle: {
    height: 55,
    width: width,
    backgroundColor: "#E4E4E4",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 0,
    flexDirection: "row",
  },
  title: { fontSize: 17, fontWeight: "bold" },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    fontWeight: "500",
  },
});
