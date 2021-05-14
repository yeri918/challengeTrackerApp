import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Calendar, CalendarList } from "react-native-calendars";

function CalendarScreen(props) {
  return (
    <CalendarList
      // Callback which gets executed when visible months change in scroll view. Default = undefined
      onVisibleMonthsChange={(months) => {
        console.log("now these months are visible", months);
      }}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={5}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={5}
      // Enable or disable scrolling of calendar list
      scrollEnabled={true}
      // Enable or disable vertical scroll indicator. Default = false
      showScrollIndicator={true}
      onDayPress={(day) => {
        console.log("selected day", day);
      }}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "orange",
  },
});

export default CalendarScreen;
