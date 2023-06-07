import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Bar = () => {
  const today = new Date();

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);

  const handleYearPress = (year) => {
    setSelectedYear(year);
  };

  const handleMonthPress = (month) => {
    setSelectedMonth(month);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={require("../favicon/profile.png")} style={styles.icon} />
        <Text style={styles.label}>
          {selectedYear}년 {selectedMonth}월
        </Text>
      </View>
      <View style={styles.centerContainer} />
      <View style={styles.rightContainer}>
        <Image source={require("../favicon/search.png")} style={styles.icon} />
        <Image source={require("../favicon/alert.png")} style={styles.icon} />
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
    width: 393,
    backgroundColor: "#F5F5F5",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  centerContainer: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    marginLeft: 8,
  },
});

export default Bar;
