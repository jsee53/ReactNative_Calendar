import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Provider } from "react-redux";
import store from "./Store";
import Photo from "./Photo";

const BottomBar = () => {
  const [image, setImage] = useState(null);
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);

  //해당 모달창을 보여줄지 여부
  const showPhotoModal = () => {
    setIsPhotoVisible(!isPhotoVisible);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={showPhotoModal}>
            <Image
              source={require("../favicon/gallery.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={showPhotoModal}>
            <Image
              source={require("../favicon/camera.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Provider store={store}>
        <Photo
          isPhotoVisible={isPhotoVisible}
          showPhotoModal={showPhotoModal}
          image={image}
        />
      </Provider>
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
