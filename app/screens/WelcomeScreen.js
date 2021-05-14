import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const Stack = createStackNavigator();

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      {/* <Image style = {styles.logo} source = {require('../assets/logo.png')}></Image> */}
      <View style={styles.loginButton}>
        <Text style={{ textAlignVertical: "center", textAlign: "center" }}>
          Login
        </Text>
      </View>

      <View style={styles.registerButton}>
        <Text style={{ flex: 1, textAlign: "center" }}>Register</Text>
      </View>
      <Button title="Go to Calendar" onPress={() => console.log()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FF9F36",
    justifyContent: "flex-end",
  },
  loginButton: {
    width: "100%",
    height: 80,
    backgroundColor: "#E6D6C3",
    borderRadius: 30,
    borderWidth: 2,
  },
  logo: {
    width: 200,
    height: 200,
  },
  registerButton: {
    width: "100%",
    height: 80,
    backgroundColor: "#E6D6C3",
    borderRadius: 30,
    borderWidth: 2,
  },
});
export default WelcomeScreen;
