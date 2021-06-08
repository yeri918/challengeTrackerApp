import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "firebase";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("AppScreen");
        console.log("navigate to app screen");
      } else {
        this.props.navigation.navigate("LoginScreen");
        console.log("navigate to login screen");
      }
    });
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
