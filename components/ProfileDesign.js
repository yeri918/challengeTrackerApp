import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Title,
  Text,
  Caption,
  TouchableRipple,
} from "react-native-paper";
import firebase from "firebase";

function ProfileDesign() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 25 }}>
          <Avatar.Image
            source={require("../app/assets/profile.png")}
            size={100}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 10, marginBottom: 5 }]}>
              Julie Park
            </Title>
            <Caption style={styles.caption}>@juliep</Caption>
            <TouchableOpacity>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.infoBoxWrapper}>
        <View style={styles.infoBox}>
          <Title>5</Title>
          <Caption>Likes Today</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>90 </Title>
          <Caption>Likes This Month</Caption>
        </View>
      </View>
      <TouchableOpacity onPress={() => firebase.auth().signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default ProfileDesign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRightColor: "#dddddd",
    borderRightWidth: 2,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: "25%",
    backgroundColor: "white",
    marginTop: 5,
    borderWidth: 1,
  },
  buttonText: {
    color: "#7f7f7f",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});
