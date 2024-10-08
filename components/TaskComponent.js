import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import firebase from "firebase";

const TaskScreen = ({ date, uid, userData }) => {
  const [listData, setListData] = useState(userData);
  // console.log(userData);
  useEffect(() => {
    if (userData !== undefined) {
      setListData(userData);
    }
  }, [userData]);

  const closeRow = async (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key == rowKey);
    var progressValue;

    await firebase
      .firestore()
      .collection("todo")
      .doc(newData[prevIndex].docID)
      .update({
        completion: !newData[prevIndex].complete,
      })
      .then(() => {
        newData.map((item) =>
          item.key == prevIndex
            ? ((item.complete = !item.complete), item)
            : item
        );
        if (newData[prevIndex].complete) {
          progressValue = newData[prevIndex].difficulty;
        } else {
          progressValue = -newData[prevIndex].difficulty;
        }
        setListData(newData);
      })
      .catch(function (error) {
        console.log("completion", error);
      });

    updateProgress(progressValue);
  };

  const updateProgress = async (progressValue) => {
    // console.log(newData[prevIndex].docID);
    await firebase
      .firestore()
      .collection("progress")
      .where("uid", "==", uid)
      .where("date", "==", new Date(date.dateString))
      .get()
      .then(function (doc) {
        if (doc.empty && progressValue > 0) {
          console.log("no matching data");
          console.log(uid, date.dateString, progressValue);
          var dateUpdate = new Date(date.dateString);
          // dateUpdate.setHours(0, 0, 0, 0);
          firebase
            .firestore()
            .collection("progress")
            .add({
              uid: uid,
              date: dateUpdate,
              progress: progressValue,
            })
            .then(console.log("post successful"))
            .catch(function (error) {
              console.log("post-error", error);
            });
        } else {
          doc.forEach((doc) => {
            console.log(doc.data().progress);
            console.log(doc.id);
            firebase
              .firestore()
              .collection("progress")
              .doc(doc.id)
              .update({ progress: doc.data().progress + progressValue });
          });
        }
      })
      .catch(function (error) {
        console.log("progress -error", error);
      });
  };

  // const addToProgress = ({uid,date,progressValue}) => {
  //   firebase
  //           .firestore()
  //           .collection("progress")
  //           .add({
  //             uid: uid,
  //             date: date,
  //             progress: progressValue,
  //           })
  //           .then(console.log("post successful"))
  //           .catch(function (error) {
  //             console.log("post-error", error);
  //           });
  // }
  const deleteRow = (rowMap, rowKey) => {
    console.log("delete row function called");
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key == rowKey);
    var progressValue;
    firebase
      .firestore()
      .collection("todo")
      .doc(newData[prevIndex].docID)
      .delete()
      .then(() => {
        if (newData[prevIndex].complete) {
          progressValue = newData[prevIndex].difficulty;
          firebase
            .firestore()
            .collection("progress")
            .where("date", "==", date)
            .get()
            .then(function (doc) {
              doc.forEach((doc) =>
                firebase
                  .firestore()
                  .collection("progress")
                  .doc(doc.id)
                  .update({
                    progress: doc.data().progress - progressValue,
                  })
              );
            });
        }
        newData.splice(prevIndex, 1); //splice(start,deleteCount)
        setListData(newData);
      })
      .catch(function (error) {
        console.log("delete unsuccessful", error);
      });
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const onRightActionStatusChange = (rowKey) => {
    console.log("onRightActionStatusChange", rowKey);
  };

  const onLeftActionStatusChange = (rowKey) => {
    console.log("onLeftActionStatusChange", rowKey);
  };

  const onRightAction = (rowKey) => {
    console.log("onRightAction", rowKey);
  };

  const deleteTask = () => {
    console.log("deleted");
  };

  const VisibleItem = (props) => {
    const { data, rowHeightAnimatedValue, removeRow, rightActionState } = props;

    if (rightActionState) {
      console.log("rightactionstate is true");
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }
    return (
      <Animated.View
        style={[styles.rowFront, { height: rowHeightAnimatedValue }]}
      >
        <View style={styles.rowFrontVisible}>
          <View>
            {!data.item.complete && (
              <View>
                <Text style={styles.title} numberOfLines={1}>
                  {data.item.title}
                </Text>

                <Text style={styles.details} numberOfLines={1}>
                  {data.item.time}
                </Text>
              </View>
            )}
            {data.item.complete && (
              <View>
                <Text
                  style={[
                    styles.title,
                    {
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                      color: "#ccc",
                    },
                  ]}
                  numberOfLines={1}
                >
                  {data.item.title}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                      color: "#ccc",
                    },
                  ]}
                  numberOfLines={1}
                >
                  {data.item.time}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Text style={{ alignSelf: "flex-end", fontSize: 12 }}>
              Difficulty
            </Text>
            <Text
              style={{ alignSelf: "flex-end", marginRight: 18, fontSize: 20 }}
            >
              {data.item.difficulty}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);
    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = (props) => {
    const {
      swipeAnimatedValue,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      // console.log(leftOpenValue);
      console.log("right action activated");
      // console.log(rightActionValue);
      Animated.spring(rowActionAnimatedValue, {
        toValue: 415,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View
        style={[styles.rowBack, { height: rowHeightAnimatedValue }]}
      >
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={onClose}
        >
          <AntDesign name="check" size={25} color="#fff" style={styles.trash} />
        </TouchableOpacity>
        <Animated.View style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <TouchableOpacity
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                // width: rowActionAnimatedValue,
              },
            ]}
            onPress={onDelete}
          >
            <Animated.View
              //the trash icon getting bigger as the user swipes left
              style={[
                styles.trash,
                {
                  transform: [
                    {
                      scale: swipeAnimatedValue.interpolate({
                        inputRange: [-90, -45],
                        outputRange: [1, 0],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={25}
                color="#fff"
              />
              {/* <Text>Trash</Text> */}
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  };
  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", flex: 2 }}>
          <FontAwesome5
            name="tasks"
            style={{ marginLeft: 15, alignSelf: "center" }}
            size={20}
          />
          <Text
            style={{
              marginLeft: 10,
              fontWeight: "bold",
              fontSize: 21,
              alignSelf: "center",
            }}
          >
            Tasks{"  "}
          </Text>
          <Text style={{ fontSize: 20, alignSelf: "center" }}>
            {date.dateString}
          </Text>
        </View>

        <View
          style={{
            // borderWidth: 1,
            // borderColor: "red",
            flex: 1,
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Ionicons
            name="add-circle-outline"
            size={30}
            style={{ justifyContent: "flex-end", marginRight: 15 }}
            onPress={() => navigation.navigate("To Do")}
          />
        </View>
      </View>

      <SwipeListView
        data={listData}
        // data={userData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe
        // leftOpenValue={100}
        rightOpenValue={-150}
        // onRowDidOpen={onRowDidOpen}
        // rightActivationValue={-250}
        // leftActivationValue={-500}
        // rightActionValue={-500}
        // leftActionValue={50}
        // onRightAction={onRightAction}
        onRightActionStatusChange={onRightActionStatusChange}
        onLeftActionStatusChange={onLeftActionStatusChange}
      />
    </View>
  );
};
export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFB554",
    flex: 1,
  },
  rowFront: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 60,
    margin: 5,
    marginBottom: 7,
  },
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    height: 60,
    paddingRight: 17,
    // backgroundColor: "green",
  },
  backRightBtnLeft: {
    backgroundColor: "#00CD3D",
    right: 75,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    // height: 50,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // height: 50,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
    marginLeft: 5,
  },
  details: {
    fontSize: 13,
    color: "orange",
    marginLeft: 5,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#FFB554",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 10,
    height: 60,
  },
  rowFrontVisible: {
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 60,
    padding: 10,
    flexDirection: "row",
  },
  header: {
    height: "8%",
    backgroundColor: "#E4E4E4",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
  },
});
