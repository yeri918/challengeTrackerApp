import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, Dimensions } from "react-native";
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

const { width, height } = Dimensions.get("window");
function ChallengeGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState([
    { id: "1", groupName: "Power", point: 17, memberCount: 3 },
    { id: "2", groupName: "Lesgo", point: 21, memberCount: 4 },
    { id: "3", groupName: "GO", point: 18, memberCount: 4 },
    { id: "4", groupName: "Motivate", point: 35, memberCount: 8 },
    { id: "5", groupName: "Great", point: 35, memberCount: 6 },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.friendListTitle}>
        <View
          style={{ flex: 1, flexDirection: "row", backgroundColor: "#E4E4E4" }}
        >
          {/* <Materiallcons name="group-work" /> */}
          <MaterialCommunityIcons
            name="account-group-outline"
            size={20}
            style={{ marginLeft: 10 }}
          />
          <Text
            style={{
              marginLeft: 10,
              alignSelf: "center",
              fontSize: 17,
              color: "#515151",
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
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
      <View
        style={{
          flexDirection: "column",
          // borderWidth: 3,
          // borderColor: "blue",
          height: (height - 120) / 3,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          numColumns={2}
          keyExtractor={(item) => item.id}
          data={group}
          renderItem={({ item }) => (
            <View
              style={{
                // flexDirection: "column",
                padding: 10,
                backgroundColor: "#fff",
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5,
                borderRadius: 15,
                width: "45%",
                // height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderColor: "orange",
                borderWidth: 5,

                // numColumns: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  alignItems: "center",
                  color: "orange",
                  marginBottom: 3,
                }}
              >
                {item.groupName}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "700" }}>
                Points: {item.point}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "700" }}>
                {item.memberCount} Members
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default ChallengeGroup;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFB554",
    // flex: 1,
    flexDirection: "column",
    marginBottom: 10,
    // borderColor: "red",
    // borderWidth: 3,
    height: (height - 60) / 2 - 60,
  },
  friendListTitle: {
    height: 55,
    width: "100%",
    backgroundColor: "#E4E4E4",
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    // borderWidth: 3,
    // borderColor: "orange",
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
