import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Expo from "expo";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
// import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = (googleUser) => {
    // console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        // console.log("idToken", googleUser.idToken);
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );

          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              // console.log("credential", credential);
              // console.log("user signed in");
              // console.log("User ID", result.user.uid);
              // console.log("check 4");
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .firestore()
                  .doc("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                    username:
                      result.additionalUserInfo.profile.given_name +
                      result.additionalUserInfo.profile.family_name,
                  });
              } else {
                // console.log("user uid", result.user.uid);
                // console.log("check 5");
                firebase
                  .firestore()
                  .doc("/users/" + result.user.uid)
                  .update({ last_logged_in: Date.now() });
              }
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "81406024840-0eu8iqtbciqloagu7gvdu71ue2ej052h.apps.googleusercontent.com",
        // behavior: "web",
        iosClientId:
          "81406024840-tm4m9i0n6dml3g0duvmi1tj8sjidekom.apps.googleusercontent.com",

        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        console.log("success");

        return result.accessToken;
      } else {
        console.log("fail");
        return { cancelled: true };
      }
    } catch (e) {
      console.log("error", e);
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>LoginScreen</Text>
        <Button
          title="Sign In With Google"
          onPress={() => this.signInWithGoogleAsync()}
          // onPress={() => console.log("sign in pressed")}
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
