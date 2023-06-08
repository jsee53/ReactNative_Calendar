import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-picker";

const BottomBar = () => {
  const openGallery = () => {
    const options = {
      mediaType: "photo",
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("사용자가 선택을 취소했습니다.");
      } else if (response.error) {
        console.log("사진 선택 중 오류가 발생했습니다:", response.error);
      } else {
        console.log("사용자가 선택한 사진:", response.uri);
        // 선택한 사진을 처리하는 로직을 여기에 추가합니다.
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={openGallery}>
          <Image
            source={require("../favicon/gallery.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
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
