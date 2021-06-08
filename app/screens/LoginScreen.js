import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

class LoginScreen extends Component {
  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: "web",
        iosClientId:
          "81406024840-tm4m9i0n6dml3g0duvmi1tj8sjidekom.apps.googleusercontent.com",

        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>LoginScreen</Text>
        <Button
          title="Sign In With Google"
          //   onPress={() => this.signInWithGoogleAsync()}
          onPress={() => console.log("sign in pressed")}
        />
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

export default LoginScreen;
