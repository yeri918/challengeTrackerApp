import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Tasks from "../components/taskList";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const TaskScreen = ({ date = new Date() }) => {
  const [listData, setListData] = useState(
    Tasks.map((TaskItem, index) => ({
      key: `${index}`,
      title: TaskItem.title,
      date: TaskItem.date,
      time: TaskItem.time,
    }))
  );
  const closeRow = (rowMap, rowKey) => {
    console.log("Closed Pressed");

    // console.log(rowKey);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    console.log("Delete Pressed");
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key == rowKey);
    newData.splice(prevIndex, 1); //splice(start,deleteCount)
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const onRightActionStatusChange = (rowKey) => {
    console.log("onRightActionStatusChangee", rowKey);
  };

  const onRightAction = (rowKey) => {
    console.log("onRightAction", rowKey);
  };

  const VisibleItem = (props) => {
    const { data, rowHeightAnimatedValue, removeRow, rightActionState } = props;

    if (rightActionState) {
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
        <TouchableHighlight style={styles.rowFrontVisible}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {data.item.title}
            </Text>

            <Text style={styles.details} numberOfLines={1}>
              {data.item.time}
            </Text>
          </View>
        </TouchableHighlight>
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
          <MaterialCommunityIcons
            name="close-circle-outline"
            size={25}
            color="#fff"
            style={styles.trash}
          />
        </TouchableOpacity>
        <Animated.View style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <TouchableOpacity
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
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
          <FontAwesome5 name="tasks" style={{ marginLeft: 15 }} size={20} />
          <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 21 }}>
            Tasks{" "}
          </Text>
          <Text style={{ fontSize: 20 }}>{date.toDateString()}</Text>
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
            onPress={() => navigation.navigate("Add")}
          />
        </View>
      </View>

      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        onRowDidOpen={onRowDidOpen}
        rightActivationValue={-200}
        rightActionValue={-500}
        onRightAction={onRightAction}
        onRightActionStatusChange={onRightActionStatusChange}
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
    backgroundColor: "orange",
    right: 75,
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
    fontSize: 12,
    color: "#999",
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
  },
  header: {
    height: "12%",
    backgroundColor: "#E4E4E4",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
  },
});
