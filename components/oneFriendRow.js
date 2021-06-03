import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
function OneFriendRow({ rank = 1, name = "Julie Park", percentage = 50 }) {
  return (
    <View style={styles.friendContainer}>
      <Text style={{ marginLeft: 13, fontWeight: "bold" }}>{rank}</Text>
      <Avatar.Image
        source={require("../app/assets/profile.png")}
        size={width * 0.1}
        style={{ marginLeft: 10, marginTop: 2, marginBottom: 2 }}
      />
      <Text
        style={[
          styles.title,
          { marginTop: 10, marginBottom: 5, marginLeft: 20 },
        ]}
      >
        {name}
      </Text>
      <Text style={{ marginLeft: 90, color: "black", fontSize: 18 }}>
        {percentage}
      </Text>
      <AntDesign
        name="heart"
        size={20}
        style={{
          marginLeft: 10,
          justifyContent: "flex-end",
          alignSelf: "center",
          color: "black",
        }}
      />
    </View>
  );
}

export default OneFriendRow;

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
    borderRadius: 10,
    backgroundColor: "#fff",
    height: height * 0.068,
    width: "95%",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 3,
    marginTop: 2,
  },
  friendListTitle: {
    height: "12%",
    width: "90%",
    backgroundColor: "#FFD283",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 0,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#000" },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    fontWeight: "500",
  },
});
