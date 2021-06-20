import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CircularProgress from "../../components/CircularProgress";
import BarProgress from "../../components/BarChart";
import { Feather } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import firebase from "firebase";

function DisplayChart(props) {
  const [uid, setUid] = useState(props.route.params.uid);
  const [todayProgress, setTodayProgress] = useState(0);
  const [doneToday, setDoneToday] = useState(0);
  const [total, setTotal] = useState(0);
  // console.log("DisplayChart", props.route.params);

  useEffect(() => {
    // setTodayProgress(0);
    // setDoneToday(0);
    // setTotal(0);
    getTodayProgress();
    getWeeklyProgress();
  }, []);

  const getTodayProgress = async () => {
    var localTotal = 0;
    var localDoneToday = 0;
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0);
    await firebase
      .firestore()
      .collection("todo")
      .where("uid", "==", uid)
      .where("date", ">=", date)
      .where("date", "<", nextDate)
      .get()
      .then(function (doc) {
        if (doc.empty) {
          console.log("getTodayProgress - doc empty");
          setTodayProgress(0);
        } else {
          doc.forEach((doc) => {
            console.log("Data:", doc.data());
            // console.log("DIFFICULTY", doc.data().difficulty);
            // console.log("Total: ", total);
            localTotal += doc.data().difficulty;
            console.log("update total-", total);
            if (doc.data().completion) {
              localDoneToday += doc.data().difficulty;
              // setDoneToday(doneToday + doc.data().difficulty);
              console.log("update donetoday", doneToday);
            }
          });
          if (total != 0) {
            localTodayProgress = localDoneToday / localTotal;
            // setTodayProgress(doneToday / total);
          } else {
            localTodayProgress = 0;
            // setTodayProgress(0);
          }
          console.log(doneToday / total);
          setTotal(localTotal);
          setDoneToday(localDoneToday);
          setTodayProgress(localTodayProgress);
        }
      })
      .catch(function (error) {
        console.log("getTodayProgress-error", error);
      });
  };

  const getWeeklyProgress = () => {
    var week = new Date();

    week.setDate(week.getDate() - 7);
    week.setHours(0, 0, 0, 0);
    console.log("a week before", week);
    console.log("uid", uid);
    console.log("week-timestamp", week.getTime());
    console.log(Date.parse(week.toDateString));
    firebase
      .firestore()
      .collection("progress")
      .where("uid", "==", uid)
      .where("date.timestamp", ">", week.getTime())
      // .where("date.timestmap", "<=", new Date())
      // .where("date", "<", new Date())
      .orderBy("date.timestamp")
      .limit(7)
      .get()
      .then(function (doc) {
        if (doc.empty) {
          console.log("getWeeklyProgress - no matching data");
        } else {
          doc.forEach((doc) => {
            console.log(doc.data().date);
          });
        }
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFB554",
        height: height + 100,
        borderRadius: 5,
      }}
    >
      <View style={{ flex: 0.8, marginBottom: 0 }}>
        <View style={styles.circularHeader} onPress={getTodayProgress}>
          <Feather name="pie-chart" size={20} style={{ marginLeft: 10 }} />
          <Text style={styles.circularHeaderText} onPress={getTodayProgress}>
            Today's Progress
          </Text>
        </View>
        <View style={styles.circularProgress}>
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <CircularProgress
              progress={todayProgress * 100}
              total={total}
              doneToday={doneToday}
            />
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

function ChartScreen(props) {
  console.log("ChartScreen-props", props.route.params.uid);
  const [todayProgress, setTodayProgress] = useState(0);
  const [doneToday, setDoneToday] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Chart"
          component={DisplayChart}
          initialParams={{
            uid: props.route.params.uid,
            todayProgress: todayProgress,
          }}
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
