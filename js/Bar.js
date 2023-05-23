import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Bar = () => {
  const today = new Date();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={require("../favicon/profile.png")} style={styles.icon} />
        <Text>
          {today.getFullYear()}년 {today.getMonth() + 1}월
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={require("../favicon/search.png")} style={styles.icon} />
        <Image source={require("../favicon/alert.png")} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // 아이템을 수평 방향으로 정렬
    alignItems: "center",
    justifyContent: "space-between", // 왼쪽과 오른쪽 사이 공간을 동일하게 분할
    paddingHorizontal: 16, // 좌우 여백
    height: 60, // 바의 높이
    backgroundColor: "#f5f5f5",
  },
  leftContainer: {
    flexDirection: "row", // 왼쪽 아이템들을 수평 방향으로 정렬
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row", // 오른쪽 아이템들을 수평 방향으로 정렬
    alignItems: "center",
  },
});

export default Bar;
