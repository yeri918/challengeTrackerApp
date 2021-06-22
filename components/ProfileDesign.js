import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Avatar, Title, Text, Caption } from "react-native-paper";
import firebase from "firebase";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import ImagePicker from "react-native-image-crop-picker";
import { Entypo } from "@expo/vector-icons";

function ProfileDesign({ uid }) {
  console.log(uid);
  const firebaseRef = firebase.firestore();
  const collectionRef = firebaseRef.doc("test/" + uid);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then((image) => {
  //     console.log(image);
  //   });
  // };

  const getProfileData = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then(function (doc) {
        if (doc.empty) {
          console.log("no profile info");
        } else {
          console.log(doc.data().first_name);
          setProfilePhoto(doc.data().profile_picture);
          setFirstName(doc.data().first_name);
          setLastName(doc.data().last_name);
          setUsername(doc.data().username);
          console.log(firstName, lastName, username, profilePhoto);
        }
      })
      .catch(function (error) {
        console.log("profile-error", error);
      });
  };

  const postProfileEdit = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        first_name: firstName,
        last_name: lastName,
        username: username,
      })
      .then(() => {
        console.log("postProfileEdit-successful");
      })
      .catch(function (error) {
        console.log("postProfileEdit-error ", error);
      });
  };

  useEffect(() => {
    getProfileData();
  }, []);
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <TouchableOpacity style={styles.profileTextTitle}>
        <Entypo
          name="chevron-small-right"
          size={25}
          style={{ color: "orange" }}
        />
        <Text style={{ fontSize: 18 }}>First Name</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.profileTextInput}
        placeholder={firstName}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TouchableOpacity style={styles.profileTextTitle}>
        <Entypo
          name="chevron-small-right"
          size={25}
          style={{ color: "orange" }}
        />
        <Text style={{ fontSize: 18 }}>Last Name</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.profileTextInput}
        placeholder={lastName}
        value={lastName}
        onChangeText={setLastName}
      />
      <TouchableOpacity style={styles.profileTextTitle}>
        <Entypo
          name="chevron-small-right"
          size={25}
          style={{ color: "orange" }}
        />
        <Text style={{ fontSize: 18 }}>Username</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.profileTextInput}
        placeholder={username}
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          sheetRef.current.snapTo(1);
          postProfileEdit();
        }}
      >
        <Text style={styles.panelButtonTitle}>Done</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);
  // const choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     // compressImageQuality: 0.7,
  //   }).then((image) => {
  //     console.log(image);
  //   });
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 25 }}>
          <Avatar.Image
            // source={require("../app/assets/profile.png")}
            source={{ uri: profilePhoto }}
            size={100}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 10, marginBottom: 5 }]}>
              {firstName} {lastName}
            </Title>
            <Caption style={styles.caption}>@{username}</Caption>
            <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
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
      <View
        style={{
          flex: 1,
          // borderColor: "red",
          // borderWidth: 3,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button2}
          onPress={() => firebase.auth().signOut()}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        {/* <Button title="Open Bottom Sheet" /> */}
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["50%", 0, 0]}
        initialSnap={1}
        // borderRadius={10}
        renderContent={renderContent}
        renderHeader={renderHeader}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
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
    borderWidth: 3,
    borderColor: "gray",
    // borderWidth: 3,
  },
  button2: {
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: "25%",
    backgroundColor: "white",
    marginTop: 5,
    borderWidth: 3,
    width: "70%",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: "gray",
    height: 40,
  },
  buttonText: {
    color: "#7f7f7f",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "orange",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  profileTextInput: {
    fontSize: 17,
    padding: 6,
    borderWidth: 2,
    borderColor: "#404040",
    // borderColor: "orange",
    margin: 6,
    color: "#A0A0A0",
    opacity: 0.8,
    // width: "92%",
    // alignSelf: "center",
    borderRadius: 8,
  },
  profileTextTitle: {
    padding: 3,
    flexDirection: "row",
    alignItems: "center",
  },
});
