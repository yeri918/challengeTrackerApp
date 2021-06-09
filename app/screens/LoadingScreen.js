import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "firebase";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    console.log("hi");
    firebase.auth().onAuthStateChanged(
      function (user) {
        console.log("check 1");
        console.log("user", user);
        if (user) {
          console.log("navigate to app screen");
          this.props.navigation.navigate("AppScreen");
        } else {
          console.log("navigate to login screen");
          this.props.navigation.navigate("LoginScreen");
        }
      }.bind(this)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
