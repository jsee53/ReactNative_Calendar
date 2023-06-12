import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Provider } from "react-redux";
import store from "./Store";
import Photo from "./Photo";

const BottomBar = () => {
  const [image, setImage] = useState(null);
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);

  const handleSubmit = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      setImage(result);
      showPhotoModal();
    } catch (error) {
      Alert.alert("Error", "Failed to pick an image.");
    }
  };

  //해당 모달창을 보여줄지 여부
  const showPhotoModal = () => {
    setIsPhotoVisible(!isPhotoVisible);
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftContainer} onPress={handleSubmit}>
          <View style={styles.contentContainer}>
            <Image
              source={require("../favicon/gallery.png")}
              style={styles.icon}
            />
            <Text style={styles.text}>앨범</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightContainer} onPress={handleSubmit}>
          <View style={styles.contentContainer}>
            <Image
              source={require("../favicon/camera.png")}
              style={styles.icon}
            />
            <Text style={styles.text}>카메라</Text>
          </View>
        </TouchableOpacity>
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
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 140,
    width: 393,
    backgroundColor: "#004898", // 하단바 배경색
    marginTop: 30,
  },
  leftContainer: {
    height: 80,
    width: 195.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // 왼쪽 정렬
    paddingBottom: 70,
  },
  rightContainer: {
    height: 80,
    width: 195.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // 오른쪽 정렬
    paddingBottom: 70,
  },
  icon: {
    width: 24, // 이미지 너비
    height: 24, // 이미지 높이
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    marginTop: 3,
    color: "#f5f5f5", // 텍스트 색상
    fontSize: 12, // 텍스트 크기
    fontWeight: 600,
  },
});

export default BottomBar;
