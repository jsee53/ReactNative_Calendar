import React from "react";
import { View, Image, StyleSheet } from "react-native";

const BottomBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={require("../favicon/gallery.png")} style={styles.icon} />
      </View>
      <View style={styles.rightContainer}>
        <Image source={require("../favicon/camera.png")} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    width: 300,
    backgroundColor: "#004898", // 하단바 배경색
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // 왼쪽 정렬
  },
  centerContainer: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // 오른쪽 정렬
  },
  icon: {
    width: 24, // 이미지 너비
    height: 24, // 이미지 높이
  },
  text: {
    marginLeft: 8,
  },
});

export default BottomBar;
