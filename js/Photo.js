import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Modal } from "react-native";
import { useSelector } from "react-redux";

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
      const base64Data = image && image.base64; // 이미지의 base64 데이터

      if (base64Data) {
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
              throw new Error("이미지 처리 실패!");
            }
          })
          .then((data) => {
            // Base64 string을 blob으로 변환
            fetch(`data:image/jpeg;base64,${data.image}`)
              .then((res) => res.blob())
              .then((blob) => {
                setSaveImage(URL.createObjectURL(blob));
              });

            setTitle(data.title);
            setStartDay(data.startDay);
            setEndDay(data.endDay);
          })
          .catch((error) => {
            console.error("이미지 처리 오류!", error);
          });
      }
    }
  }, [isPhotoVisible, image]);

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
