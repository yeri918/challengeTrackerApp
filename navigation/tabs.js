import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalendarScreen from "../app/screens/CalendarScreen";
import WelcomeScreen from "../app/screens/WelcomeScreen";
import FriendsScreen from "../app/screens/FriendsScreen";
import ChartScreen from "../app/screens/ChartScreen";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

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
          height: 90,
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
                size={40}
                style={{ color: focused ? "black" : "#333333" }}
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
                size={40}
                style={{ color: focused ? "black" : "#333333" }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Plus"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="plus"
              size={40}
              style={{ color: focused ? "black" : "#333333" }}
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
                size={40}
                style={{ color: focused ? "black" : "#333333" }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
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
              <AntDesign
                name="home"
                size={40}
                style={{ color: focused ? "black" : "#333333" }}
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
    backgroundColor: "yellow",
  },
});
export default MyTabs;
