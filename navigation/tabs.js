import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalendarScreen from "../app/screens/CalendarScreen";
import WelcomeScreen from "../app/screens/WelcomeScreen";
import FriendsScreen from "../app/screens/FriendsScreen";
import ChartScreen from "../app/screens/ChartScreen";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import AddTaskFullScreen from "../app/screens/AddTaskFullScreen";
import ProfileScreen from "../app/screens/ProfileScreen";
import AddTaskScreen from "../app/screens/AddTaskScreen";

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.add} onPress={onPress}>
    <View style={styles.addDesign}>{children}</View>
  </TouchableOpacity>
);

const MyTabs = ({ uid }) => {
  console.log("MyTab", uid);
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "orange",
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        initialParams={{ uid: uid }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={30}
                style={{ color: focused ? "#333333" : "#dddddd" }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chart"
        component={ChartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="checkcircleo"
                size={30}
                style={{ color: focused ? "#333333" : "#dddddd" }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Plus"
        component={AddTaskFullScreen}
        initialParams={{ uid: uid }}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="plus"
              size={30}
              style={{ color: focused ? "#333333" : "orange" }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Connect"
        component={FriendsScreen}
        initialParams={{ uid: uid }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="team"
                size={30}
                style={{ color: focused ? "#333333" : "#dddddd" }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ userID: uid }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="home"
                size={30}
                style={{ color: focused ? "#333333" : "#dddddd" }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  add: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  addDesign: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: "#fff",
    borderColor: "orange",
    borderWidth: 5,
  },
});
export default MyTabs;
