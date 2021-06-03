import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalendarScreen from "../app/screens/CalendarScreen";
import WelcomeScreen from "../app/screens/WelcomeScreen";
import FriendsScreen from "../app/screens/FriendsScreen";
import ChartScreen from "../app/screens/ChartScreen";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import AddTaskScreen from "../app/screens/AddTaskScreen";
import ProfileScreen from "../app/screens/ProfileScreen";
import TestScreen from "../app/screens/TestScreen";

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.add} onPress={onPress}>
    <View style={styles.addDesign}>{children}</View>
  </TouchableOpacity>
);

const MyTabs = () => {
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
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
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
                top: 10,
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
        component={TestScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="plus"
              size={30}
              style={{ color: focused ? "#333333" : "#dddddd" }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Connect"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
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
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
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
    top: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  addDesign: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: "orange",
    borderColor: "#fff",
    borderWidth: 5,
  },
});
export default MyTabs;
