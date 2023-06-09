import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Modal } from "react-native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

//사진 처리 모달 컴포넌트
function Photo({ isPhotoVisible, showPhotoModal, image }) {
  const id_key = useSelector((state) => state.idKey); // 로그인한 사용자의 id_key
  const [saveImage, setSaveImage] = useState(image);
  const [title, setTitle] = useState();
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();

  //사진을 서버로 보내고 제목과 일정을 받아옴
  useEffect(() => {
    if (isPhotoVisible) {
      (async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });

        if (!result.canceled) {
          const base64Data = result.base64;

          // userData 안의 image에 base64Data를 넣고, id_key도 함께 추가합니다.
          const userData = {
            id_key: id_key,
            image: `data:image/jpeg;base64,${base64Data}`,
          };

          const postData = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          };

          fetch("http://127.0.0.1:8000/photo", postData)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                alert("이미지 처리 실패!");
              }
            })
            .then((data) => {
              setSaveImage(data.image);
              setTitle(data.title);
              setStartDay(data.startDay);
              setEndDay(data.endDay);
            })
            .catch((error) => {
              console.error("이미지 처리 오류!", error);
            });
        }
      })();
    } else {
      //모달 창 닫을 때 초기화
      setSaveImage(null);
      setTitle(null);
      setStartDay(null);
      setEndDay(null);
    }
  }, [isPhotoVisible]);

  return (
    <Modal
      animationType="none" //화면에 띄워질 때 애니메이션
      transparent={true} //모달 화면의 투명도
      visible={isPhotoVisible} //모달 화면의 show 여부
      onRequestClose={showPhotoModal} //뒤로가기 시 모달창 닫음(안드로이드 용)
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => {
              showPhotoModal();
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>
          {saveImage && (
            <Image
              source={{ uri: saveImage }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Text>{title}</Text>
          <Text>{startDay}</Text>
          <Text>{endDay}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: 250,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    width: 300,
    height: 200,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 5,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default Photo;
