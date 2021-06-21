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
  const [weeklyProgress, setWeeklyProgress] = useState([]);

  useEffect(() => {
    getTodayProgress();
    getWeeklyProgress();
  }, []);

  const getTodayProgress = async () => {
    var localTotal = 0;
    var localDoneToday = 0;
    var localTodayProgress = 0;
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0);
    // console.log("---------------------");
    // console.log(localTotal, localDoneToday, localTodayProgress, date, nextDate);
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
            // console.log("Data:", doc.data());
            localTotal += doc.data().difficulty;
            // console.log("update total-", localTotal);
            if (doc.data().completion) {
              localDoneToday += doc.data().difficulty;
              // console.log("update donetoday", localDoneToday);
            }
          });
          if (total != 0) {
            localTodayProgress = localDoneToday / localTotal;
          } else {
            localTodayProgress = 0;
          }

          setTotal(localTotal);
          setDoneToday(localDoneToday);
          setTodayProgress(localTodayProgress);
        }
      })
      .catch(function (error) {
        console.log("getTodayProgress-error", error);
      });
  };

  const getWeeklyProgress = async () => {
    var localWeeklyProgress = [];
    var week = new Date();
    week.setHours(0, 0, 0, 0);
    week.setDate(week.getDate() - 7);
    // week.setHours(0, 0, 0, 0);
    console.log(week.toLocaleDateString());
    console.log("a week before", week);
    await firebase
      .firestore()
      .collection("progress")
      .where("uid", "==", uid)
      .where("date", ">=", week)
      // .where("date", "<=", new Date())
      // .where("date", "<", new Date())
      .orderBy("date")
      // .limit(7)
      .get()
      .then(function (doc) {
        if (doc.empty) {
          console.log("getWeeklyProgress - no matching data");
          setWeeklyProgress([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        } else {
          console.log("Weekly Progress");
          doc.forEach((doc) => {
            console.log(new Date(doc.data().date.seconds * 1000));
            localWeeklyProgress.push(
              new Date(doc.data().date.seconds * 1000).getDay()
            );
            localWeeklyProgress.push(doc.data().progress);
            // console.log(doc.data().progress);
          });
        }
        // console.log(localWeeklyProgress);
        setWeeklyProgress(localWeeklyProgress);
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
          <Text style={styles.circularHeaderText} onPress={getWeeklyProgress}>
            Weekly Progress
          </Text>
        </View>
        <View style={styles.barProgress}>
          <View
            style={{
              justifyContent: "flex-start",
              alignSelf: "center",
              // borderWidth: 3,
              // borderColor: "red",
            }}
            // onPress={getWeeklyProgress}
          >
            <BarProgress
              style={{ width: "95%", borderWidth: 3, borderColor: "blue" }}
              weeklyProgress={weeklyProgress}
            />
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
