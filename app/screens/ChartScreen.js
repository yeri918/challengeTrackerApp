import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CircularProgress from "../../components/CircularProgress";
import BarProgress from "../../components/BarChart";

function DisplayChart() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.circularHeader}>
          <Text style={styles.circularHeaderText}>Today's Progress</Text>
        </View>
        <View style={styles.circularProgress}>
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <CircularProgress progress={10} />
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.circularHeader}>
          <Text style={styles.circularHeaderText}>Weekly Progress</Text>
        </View>
        <View style={styles.barProgress}>
          <View style={{ justifyContent: "flex-start", alignSelf: "center" }}>
            <BarProgress />
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
    height: "12%",
    width: "90%",
    backgroundColor: "#FFD283",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: 5,
  },
  circularHeaderText: { fontSize: 15, color: "#515151", fontWeight: "bold" },
  barProgress: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
