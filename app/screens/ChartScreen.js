import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CircularProgress from "../../components/CircularProgress";
import BarProgress from "../../components/BarChart";
import { Feather } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
function DisplayChart() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFB554",
        height: height + 100,
        // borderWidth: 3,
        // borderColor: "orange",
        borderRadius: 5,
      }}
    >
      <View style={{ flex: 0.8, marginBottom: 0 }}>
        <View style={styles.circularHeader}>
          <Feather name="pie-chart" size={20} style={{ marginLeft: 10 }} />
          <Text style={styles.circularHeaderText}>Today's Progress</Text>
        </View>
        <View style={styles.circularProgress}>
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <CircularProgress progress={10} />
          </View>
        </View>
      </View>
      <View
        style={{
          height: (height - 60) / 2,
          // borderWidth: 1,
          // borderColor: "orange",
        }}
      >
        <View style={styles.circularHeader}>
          <Feather name="bar-chart-2" size={20} style={{ marginLeft: 10 }} />
          <Text style={styles.circularHeaderText}>Weekly Progress</Text>
        </View>
        <View style={styles.barProgress}>
          <View
            style={{
              justifyContent: "flex-start",
              alignSelf: "center",
              // borderWidth: 3,
              // borderColor: "orange",
            }}
          >
            <BarProgress style={{ width: "95%" }} />
          </View>
        </View>
      </View>
    </View>
  );
}
const Stack = createStackNavigator();

function ChartScreen() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Chart"
          component={DisplayChart}
          options={{
            title: "Charts",
            headerStyle: {
              backgroundColor: "orange",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default ChartScreen;

const styles = StyleSheet.create({
  circularProgress: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  circularHeader: {
    height: height * 0.07,
    backgroundColor: "#E4E4E4",
    alignItems: "center",
    marginBottom: 0,
    flexDirection: "row",
    // borderBottomWidth: 3,
    // borderBottomColor: "orange",
  },
  circularHeaderText: {
    fontSize: 17,
    color: "#515151",
    fontWeight: "bold",
    marginLeft: 10,
  },
  barProgress: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
