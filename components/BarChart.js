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

function BarProgress({
  mon = 30,
  tue = 50,
  wed = 80,
  thu = 50,
  fri = 50,
  sat = 80,
  sun = 100,
}) {
  // console.log("monday:", monday);
  const fill = "rgb(134,65,244)";
  const data = {
    progress: [
      { x: "MON", y: mon },
      { x: "TUE", y: tue },
      { x: "WED", y: wed },
      { x: "THU", y: thu },
      { x: "FRI", y: fri },
      { x: "SAT", y: sat },
      { x: "SUN", y: sun },
    ],
    help: [null, null, null, null, null, null, null],
  };
  return (
    <View style={styles.container}>
      <VictoryChart
        width={400}
        height={270}
        domain={{ y: [0, 100] }}
        domainPadding={20}
      >
        <VictoryBar
          data={data.progress}
          cornerRadius={5}
          barWidth={15}
          style={{ data: { fill: "orange" } }}
          labels={({ datum }) => `${datum.y}%`}
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
