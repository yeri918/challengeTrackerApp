import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";

function BarProgress({ weeklyProgress }) {
  // console.log("monday:", monday);
  const fill = "rgb(134,65,244)";
  const data = {
    progress: [
      { x: "Day 1", y: weeklyProgress[1] },
      { x: "Day 2", y: weeklyProgress[3] },
      { x: "Day 3", y: weeklyProgress[5] },
      { x: "Day 4", y: weeklyProgress[7] },
      { x: "Day 5", y: weeklyProgress[9] },
      { x: "Day 6", y: weeklyProgress[11] },
      { x: "Today", y: weeklyProgress[13] },
    ],
  };
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  return (
    <View style={styles.container}>
      <VictoryChart
        width={400}
        height={350}
        domain={{ y: [0, Math.max(...weeklyProgress) + 2] }}
        domainPadding={20}
      >
        <VictoryBar
          data={data.progress}
          cornerRadius={5}
          barWidth={15}
          style={{ data: { fill: "orange" } }}
          labels={({ datum }) => `${datum.y}`}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});

export default BarProgress;
