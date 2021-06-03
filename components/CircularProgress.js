import React, { useRef, useEffect } from "react";
import styled from "styled-components/native";
import { Animated, Text, StyleSheet, Dimensions } from "react-native";

const EMPTY_COLOR = "#a0a0a1";
const PROGRESS_COLOR = "orange";
const { width, height } = Dimensions.get("window");
const SIZE = height * 0.25;

const CircelBase = styled(Animated.View)`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  border-width: 25px;
`;

const EmptyCircle = styled(CircelBase)`
  border-color: ${EMPTY_COLOR};
  justify-content: center;
  align-items: center;
  transform: rotate(-45deg);
`;

const Indicator = styled(CircelBase)`
  position: absolute;
  border-left-color: ${PROGRESS_COLOR};
  border-top-color: ${PROGRESS_COLOR};
  border-right-color: transparent;
  border-bottom-color: transparent;
`;

const CoverIndicator = styled(CircelBase)`
  position: absolute;
  border-left-color: ${EMPTY_COLOR};
  border-top-color: ${EMPTY_COLOR};
  border-right-color: transparent;
  border-bottom-color: transparent;
`;

function CircularProgress({ progress = 0 }) {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  const animateProgress = useRef((toValue) => {
    Animated.spring(animatedProgress, {
      toValue,
      useNativeDriver: true,
    }).start();
  }).current;

  useEffect(() => {
    animateProgress(progress);
  }, [animateProgress, progress]);

  const firstIndicatorRotate = animatedProgress.interpolate({
    inputRange: [0, 50],
    outputRange: ["0deg", "180deg"],
    extrapolate: "clamp",
  });

  const secondIndicatorRotate = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "360deg"],
    extrapolate: "clamp",
  });

  const secondIndicatorVisibility = animatedProgress.interpolate({
    inputRange: [0, 49, 50, 100],
    outputRange: [0, 0, 1, 1],
    extrapolate: "clamp",
  });

  return (
    <EmptyCircle>
      <Indicator style={{ transform: [{ rotate: firstIndicatorRotate }] }} />
      <CoverIndicator />
      <Indicator
        style={{
          transform: [{ rotate: secondIndicatorRotate }],
          opacity: secondIndicatorVisibility,
        }}
      />
      <Text style={styles.progressText}>{progress}%</Text>
    </EmptyCircle>
  );
}

const styles = StyleSheet.create({
  progressText: {
    color: "orange",
    transform: [{ rotate: "45deg" }],
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default CircularProgress;
