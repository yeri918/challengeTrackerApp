import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Calendar, CalendarList } from "react-native-calendars";
import ActionSheet from "../components/ActionSheet";
import firebase from "firebase";

const vacation = { key: "vacation", color: "red", selectedDotColor: "red" };
const workout = { key: "workout", color: "blue", selectedDotColor: "blue" };
const { width, height } = Dimensions.get("screen");

function CalendarComponent({ uid }) {
  const fullDate = new Date();
  const [date, setDate] = useState({
    dateString: fullDate.toDateString(),
    day: fullDate.getDate(),
    month: fullDate.getMonth() + 1,
    timestamp: fullDate.getTime(),
    year: fullDate.getFullYear(),
  });

  const [listData, setListData] = useState(new Map());
  var testList = [];
  var nextDate = new Date(date.dateString);
  nextDate.setDate(nextDate.getDate() + 1);

  useEffect(() => {
    getData(date, nextDate);
    createProgress();
  }, []);

  const createProgress = async () => {
    var today = new Date(date.dateString);
    today.setHours(9, 0, 0, 0);
    console.log("Today", today);
    await firebase
      .firestore()
      .collection("progress")
      .where("uid", "==", uid)
      .where("date", "==", today)
      .get()
      .then(function (doc) {
        if (doc.empty) {
          firebase.firestore().collection("progress").add({
            uid: uid,
            date: today,
            progress: 0,
          });
        } else {
          console.log("createProgress-already exists");
        }
      });
  };
  const getData = async (date, nextDate) => {
    var selectedDate = new Date(date.dateString);
    selectedDate.setHours(0, 0, 0, 0);
    console.log(selectedDate);
    nextDate.setHours(0, 0, 0, 0);
    console.log(nextDate);
    await firebase
      .firestore()
      .collection("todo")
      .where("uid", "==", uid)
      .where("date", ">=", selectedDate)
      .where("date", "<", nextDate)
      .get()
      .then(function (doc) {
        if (doc.empty) {
          console.log("no matching data");
          testList = [];
        } else {
          var key = 0;
          var time;
          doc.forEach((doc) => {
            // console.log("DATA", doc.data());
            if (doc.data().noTime) {
              time = "Full day";
            } else {
              var startT = new Date(
                doc.data().startTime.seconds * 1000
              ).toLocaleTimeString();
              var startTIndex = new Date(doc.data().startTime.seconds * 1000)
                .toLocaleTimeString()
                .split(":", 2)
                .join(":").length;
              var start =
                startT.substring(0, startTIndex) +
                startT.substring(startTIndex + 4, startT.length);

              var endT = new Date(
                doc.data().endTime.seconds * 1000
              ).toLocaleTimeString();
              var endTIndex = new Date(doc.data().endTime.seconds * 1000)
                .toLocaleTimeString()
                .split(":", 2)
                .join(":").length;
              var end =
                endT.substring(0, endTIndex) +
                endT.substring(endTIndex + 4, endT.length);

              time = start + " - " + end;
            }
            // console.log("---(DATE)", doc.data().date.toDate().toUTCString());
            testList.push({
              key: `${key}`,
              title: doc.data().task,
              time: time,
              difficulty: doc.data().difficulty,
              complete: doc.data().completion,
              docID: doc.id,
            });
            key += 1;
          });
        }
      })
      .then(() => {
        setListData(testList);
      });
  };
  return (
    <SafeAreaView style={{ width, height }}>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <CalendarList
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          current={new Date()}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            // console.log("-----CALENDARLIST(onDayPress)-----");
            // console.log("selected day", day.dateString);
            setDate(day);

            // console.log("date:", date);
            nextDate = new Date(day.dateString);
            nextDate.setDate(nextDate.getDate() + 1);
            console.log("next date:", nextDate);
            getData(day, nextDate);
            // console.log(listData);
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
      <ActionSheet uid={uid} date={date} data={listData} />
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
