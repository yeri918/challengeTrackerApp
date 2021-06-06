import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { Avatar, Title, Caption } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
const OneFriend = ({ item, index }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text
          style={{
            fontWeight: "bold",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {index + 1}
        </Text>
        <Avatar.Image
          source={require("../app/assets/profile.png")}
          size={width * 0.1}
          style={{ marginLeft: 10, marginTop: 2, marginBottom: 2 }}
        />
        <Text
          style={[
            styles.title,
            {
              marginLeft: 20,
              alignSelf: "center",
            },
          ]}
        >
          {item.name}
        </Text>
      </View>
      <View
        style={{
          // borderColor: "blue",
          // borderWidth: 1,
          height: height * 0.035,
          justifyContent: "center",
        }}
      >
        <Text style={{ marginRight: 10, color: "black", fontSize: 16 }}>
          {item.point} points
        </Text>
      </View>
      <TouchableOpacity onPress={() => setClicked(!clicked)}>
        {clicked ? (
          <AntDesign
            name="heart"
            size={18}
            style={{
              marginLeft: 10,
              justifyContent: "flex-end",
              alignSelf: "center",
              color: "red",
            }}
          />
        ) : (
          <AntDesign
            name="heart"
            size={18}
            style={{
              marginLeft: 10,
              justifyContent: "flex-end",
              alignSelf: "center",
              color: "black",
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OneFriend;

const styles = StyleSheet.create({
  title: { fontSize: 17, fontWeight: "bold" },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    fontWeight: "500",
  },
});
