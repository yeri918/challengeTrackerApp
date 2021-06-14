import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Calendar, CalendarList } from "react-native-calendars";
import ActionSheet from "../components/ActionSheet";

const vacation = { key: "vacation", color: "red", selectedDotColor: "red" };
const workout = { key: "workout", color: "blue", selectedDotColor: "blue" };
const { width, height } = Dimensions.get("screen");
function CalendarComponent() {
  const [date, setDate] = useState(new Date());
  return (
    <SafeAreaView style={{ width, height }}>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <CalendarList
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          current={new Date()}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log("selected day", day);
            setDate(day);
            console.log(date);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"yyyy MM"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction) => <Arrow />}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
          style={styles.calendarDesign}
          theme={theme}
          // markedDates={{
          //   "2021-05-10": { dots: [vacation, workout], disabled: false },
          //   "2021-05-11": {
          //     dots: [vacation, workout],
          //     disabled: false,
          //   },
          // }}
          markingType={"multi-dot"}
        />
      </SafeAreaView>
      <ActionSheet uid={"000"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calendarDesign: {
    paddingTop: 5,
    borderTopWidth: 5,
    borderWidth: 5,
    borderColor: "#FFBD49",
    height: "100%",
    width: "100%",
  },
});

const theme = {
  // backgroundColor: "gray",
  calendarBackground: "white",
  todayTextColor: "orange",
  textMonthFontSize: 18,
};

export default CalendarComponent;
