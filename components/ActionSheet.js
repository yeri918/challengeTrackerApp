import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  Animated,
} from "react-native";
// import Animated, { Easing } from "react-native-reanimated";
import TaskScreen from "./TaskComponent";

const { width, height } = Dimensions.get("window");
const ActionSheet = ({ uid }) => {
  console.log("ActionSheet", uid);
  const [alignment] = useState(new Animated.Value(0));

  const bringUpActionSheet = () => {
    Animated.timing(alignment, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const lowerTheActionSheet = () => {
    Animated.timing(alignment, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const gestureHandler = (e) => {
    console.log("gestureHandler");
    console.log(e.nativeEvent.contentOffset.y);
    if (e.nativeEvent.contentOffset.y > 0) {
      console.log("hi");
      console.log("height:", height, "width:", width);
      bringUpActionSheet();
    } else if (e.nativeEvent.contentOffset.y < 0) {
      lowerTheActionSheet();
    }
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: alignment.interpolate({
                inputRange: [0, 1],
                outputRange: [height / 3, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={{ flex: 0.8 }}>
        <ScrollView
          onScroll={(e) => gestureHandler(e)}
          style={styles.grabber}
        ></ScrollView>
      </View>
      <View style={{ flex: 30, width: width - 10 }}>
        <TaskScreen
          style={{ width: width, position: "absolute" }}
          date={new Date()}
          uid={uid}
        />
      </View>

      {/* <Text>hi</Text> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFB554",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: height / 1.2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: width,
    alignItems: "center",
    // marginHorizontal: 10,
    justifyContent: "flex-start",
    // alignContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  grabber: {
    width: width / 2,
    borderTopWidth: 5,
    borderTopColor: "#aaa",
    // borderWidth: 2,
    // borderColor: "black",
    marginTop: 5,
    borderRadius: 3,
    position: "absolute",
    height: 12,
    alignSelf: "center",
  },
});

export default ActionSheet;
