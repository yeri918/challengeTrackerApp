import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import OneFriend from "../components/OneFriend";
import firebase from "firebase";
import { Avatar } from "react-native-paper";
const { width, height } = Dimensions.get("window");
function FriendsRanking({ uid }) {
  console.log("FriendsRanking", uid);

  const [group, setGroup] = useState([
    { id: "1", name: "Julie Park", point: 12 },
    { id: "2", name: "Tania Kim", point: 11 },
    { id: "3", name: "Gabby Kwon", point: 9 },
    { id: "4", name: "Michelle Byun", point: 9 },
    { id: "5", name: "Grace Jung", point: 5 },
  ]);
  const [friends, setFriends] = useState();
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [friendId, setFriendId] = useState();
  const [friendCheck, setFriendCheck] = useState(false);

  useEffect(() => {
    getFriendsList();
  }, []);

  const getName = async (id) => {
    var name, firstName, lastName;
    console.log("id:", id);
    await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then(function (userDoc) {
        console.log("check 2");
        if (userDoc.empty) {
          console.log("cannot find the name");
        } else {
          // userDoc.forEach((userDoc)=> {
          console.log("userData", userDoc.data());
          firstName = userDoc.data().first_name;
          lastName = userDoc.data().last_name;
        }
        name = firstName + " " + lastName;
        console.log("name:", name);
      });
    return name;
  };
  const getFriendsList = async () => {
    var friendRankingInfo = {};
    var localFriends = [];
    await firebase
      .firestore()
      .collection("friends")
      .where("user", "==", uid)
      .get()
      .then(function (doc) {
        if (doc.empty) {
          console.log("no friends");
        } else {
          doc.forEach((doc) => {
            var progress = 0;
            console.log(doc.data().friends);
            var userName;
            for (const i in doc.data().friends) {
              console.log(doc.data().friends[i]);
              firebase
                .firestore()
                .collection("progress")
                .where("uid", "==", doc.data().friends[i])
                .get()
                .then(function (d) {
                  console.log("check 1");
                  userName = getName(doc.data().friends[i]);
                  console.log("1-userName:", userName);
                  if (d.empty) {
                    console.log("friends - doc is empty");
                  } else {
                    progress = d.data().progress;
                  }
                });
              console.log("check 3");
              friendRankingInfo = {
                id: doc.data().friends[i],
                name: userName,
                progress: progress,
              };
              localFriends.push(friendRankingInfo);
              console.log("friendRankingInfo", friendRankingInfo);
            }
            setFriends(localFriends);
          });
        }
      });
  };

  const friendsCheck = async () => {
    console.log("friendsCheck ", friendId);
    var localFriendId;
    await firebase
      .firestore()
      .collection("users")
      .where("username", "==", username)
      .get()
      .then(function (doc) {
        if (doc.empty) {
          console.log("GetFriend - no matching user");
        } else {
          var localFriendsList = [];
          var friendData;
          var id_n = 0;
          doc.forEach((doc) => {
            console.log(doc.id);
            setFriendId(doc.id);
            localFriendId = doc.id;
            friendData = {
              id: doc.id,
              firstName: doc.data().first_name,
              lastName: doc.data().last_name,
              profilePicture: doc.data().profile_picture,
            };
            localFriendsList.push(friendData);
            id_n++;
            // localFriendsList.push(doc.id);

            console.log(localFriendsList);
          });
        }
        setFriendsList(localFriendsList);
      })
      .catch(function (error) {
        console.log("getFriend - error", error);
      });
    await firebase
      .firestore()
      .collection("friends")
      .where("user", "==", uid)
      .where("friends", "array-contains", localFriendId)
      .get()
      .then(function (doc) {
        if (doc.empty) {
          console.log("friendsCheck - not a friend yet");
          setFriendCheck(false);
        } else {
          console.log("friendsCheck - data");
          doc.forEach((doc) => {
            console.log(doc.data());
          });
          setFriendCheck(true);
        }
      })
      .catch(function (error) {
        console.log("friendsCheck - error", error);
      });
  };
  const addUser = async (friendId) => {
    console.log("addUser", friendId);
    setFriendCheck(true);
    await firebase
      .firestore()
      .collection("friends")
      .add({
        user: uid,
        friends: [friendId],
      })
      .then(() => {
        console.log("now friends  ");
      })
      .catch(function (error) {
        console.log("addUser - error", error);
      });
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          borderColor: "orange",
          borderWidth: 3,
          backgroundColor: "white",
          margin: 10,
          flexDirection: "row",
          marginTop: 10,
          borderRadius: 15,
        }}
      >
        <Avatar.Image
          size={50}
          style={{ margin: 10, marginLeft: 10 }}
          source={{ uri: item.profilePicture }}
        />
        <Text
          style={{
            margin: 5,
            fontSize: 20,
            justifyContent: "center",
            alignSelf: "center",
            color: "black",
          }}
        >
          {item.firstName} {item.lastName}
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "center",
            marginRight: 20,
          }}
        >
          {!friendCheck && (
            <AntDesign
              name="adduser"
              size={20}
              onPress={() => addUser(item.id)}
            />
          )}
          {friendCheck && <MaterialIcons name="check" size={30} />}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.friendListTitle}>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <FontAwesome
            name="superpowers"
            size={20}
            style={{ marginLeft: 10, alignSelf: "center" }}
          />
          <Text style={styles.headerText}>Motivated Rankings</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            marginRight: 10,
            // borderWidth: 1,
            // borderColor: "blue",
          }}
        >
          <Ionicons
            name="person-add-outline"
            size={20}
            onPress={() => setModal(true)}
          />
          <Modal isVisible={true} transparent={true} visible={modal}>
            <View
              style={{
                backgroundColor: "#000000aa",
                flex: 1,
                height: 50,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  margin: 50,
                  height: "50%",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: "orange",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    // fontSize: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}
                  >
                    Add a Friend
                  </Text>
                </View>
                <View
                  style={{
                    flex: 6,
                    // justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <TextInput
                      style={{
                        marginTop: 5,
                        // height: 30,
                        borderColor: "black",
                        borderWidth: 1,
                        fontSize: 18,
                        margin: 5,
                        width: "80%",
                        borderRadius: 8,
                        // alignSelf: "center",
                        padding: 8,
                      }}
                      placeholder="username"
                      value={username}
                      onChangeText={setUsername}
                    />

                    <View
                      style={{
                        // borderWidth: 2,
                        // borderColor: "red",
                        justifyContent: "center",
                        alignItems: "center",
                        // width: 20,
                      }}
                    >
                      <FontAwesome
                        name="search"
                        size={20}
                        style={{
                          alignSelf: "center",
                        }}
                        onPress={() => friendsCheck()}
                      />
                    </View>
                  </View>
                  {/* <Text>{username}</Text> */}
                  <View style={{ height: "60%", width: "100%" }}>
                    <FlatList data={friendsList} renderItem={renderItem} />
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "orange",
                      width: 90,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 15,
                    }}
                    onPress={() => setModal(false)}
                  >
                    <Text style={{ fontSize: 15, color: "#fff" }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <FlatList
        data={group}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 5 }}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.friendContainer}>
              <OneFriend item={item} index={index} />
            </View>
          );
        }}
      />
    </View>

    //   <View style={{ flex: 1, backgroundColor: "#999999" }} />
  );
}
export default FriendsRanking;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB554",
    flex: 1,
    flexDirection: "column",
  },
  friendContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: height * 0.07,
    padding: 20,
    marginBottom: 5,
    marginTop: 0,
    opacity: 0.9,
  },
  friendListTitle: {
    height: 55,
    width: width,
    backgroundColor: "#E4E4E4",
    alignItems: "center",
    // marginTop: /5,
    marginBottom: 0,
    flexDirection: "row",
    borderColor: "orange",
    borderWidth: 3,
    borderBottomWidth: 1,
  },
  title: { fontSize: 17, fontWeight: "bold" },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    fontWeight: "500",
  },
  headerText: {
    marginLeft: 10,
    alignSelf: "center",
    fontSize: 17,
    color: "#515151",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
