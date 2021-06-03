import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import { TouchableHighlight } from "react-native-gesture-handler";
import OneFriendRow from "../components/oneFriendRow";
import {
  Materiallcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

function ChallengeGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState([
    { id: "1", groupName: "Power", point: 17 },
    { id: "2", groupName: "Lesgo", point: 21 },
    { id: "3", groupName: "GO", point: 18 },
    { id: "4", groupName: "Motivate", point: 35 },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.friendListTitle}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {/* <Materiallcons name="group-work" /> */}
          <MaterialCommunityIcons
            name="account-group-outline"
            size={20}
            style={{ marginLeft: 10 }}
          />
          <Text style={{ fontSize: 17, color: "#555", marginLeft: 10 }}>
            Motivation Groups
          </Text>
        </View>
        <Ionicons
          name="add-circle-outline"
          size={25}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("Add")}
        />
      </View>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={group}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "column",
              padding: 20,
              backgroundColor: "white",
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 2,
              borderRadius: 15,
            }}
          >
            <Text
              style={{ fontSize: 15, fontWeight: "bold", alignItems: "center" }}
            >
              {item.groupName}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "700" }}>
              Points: {item.point}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

export default ChallengeGroup;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB554",
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
  },
  friendContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "orange",
    height: 60,
    width: "80%",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  friendListTitle: {
    height: 55,
    width: "100%",
    backgroundColor: "#E4E4E4",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
  },
  title: { fontSize: 18, fontWeight: "bold", color: "white" },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    fontWeight: "500",
  },
  list: {
    backgroundColor: "#fff",
    marginBottom: 5,
    padding: 30,
    fontSize: 15,
    marginHorizontal: 10,
    marginTop: 10,
  },
});
