import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import OneFriend from "../components/OneFriend";
import firebase from "firebase";
const { width, height } = Dimensions.get("window");
function FriendsRanking({ uid }) {
  console.log("FriendsRanking", uid);

  const [group, setGroup] = useState([
    { id: "1", name: "Julie Park", point: 57 },
    { id: "2", name: "Annie Park", point: 51 },
    { id: "3", name: "Gabby Kwon", point: 48 },
    { id: "4", name: "Michelle Byun", point: 35 },
    { id: "5", name: "Grace Jung", point: 10 },
  ]);
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");
  const [friendsList, setFriendsList] = useState([]);

  const getFriend = async () => {
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
          doc.forEach((doc) => {
            console.log(doc.id);
            localFriendsList.push(doc.id);
            console.log(localFriendsList);
          });
        }
        setFriendsList(localFriendsList);
      })
      .catch(function (error) {
        console.log("getFriend - error", error);
      });
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
                        onPress={getFriend}
                      />
                    </View>
                  </View>
                  <Text>{username}</Text>
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
      {/* <OneFriendRow rank={1} name={"Annie Park"} percentage={90} />
      <OneFriendRow rank={2} name={"Julie Park"} percentage={80} />
      <OneFriendRow rank={3} name={"Daniel Kim"} percentage={60} />
      <OneFriendRow rank={4} name={"Mary Lee   "} percentage={50} />
      <OneFriendRow rank={5} name={"Tania Lim   "} percentage={30} /> */}
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
