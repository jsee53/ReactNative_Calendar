import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import store from "./Store";
import Profile from "./Profile";

const Bar = ({ month, year }) => {
  // 프로필 모달 표시 여부
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  // 프로필 클릭 이벤트 처리 함수
  const handleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={handleProfile}>
          <Image
            source={require("../favicon/profile.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectmonth}>
          <Text style={styles.label}>
            {year} / {month}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centerContainer} />
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.selectmonth}>
          <Image
            source={require("../favicon/search.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectmonth}>
          <Image source={require("../favicon/alert.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {isProfileVisible && (
        <Provider store={store}>
          <Profile
            isProfileVisible={isProfileVisible}
            handleProfile={handleProfile}
          />
        </Provider>
      )}
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
  selectmonth: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {},
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
