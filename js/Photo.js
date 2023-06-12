import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { Modal } from "react-native";
import { useSelector } from "react-redux";

//사진 처리 모달 컴포넌트
function Photo({ isPhotoVisible, showPhotoModal, image }) {
  const id_key = useSelector((state) => state.idKey); // 로그인한 사용자의 id_key
  const [saveImage, setSaveImage] = useState(image);
  const [title, setTitle] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");

  //사진을 서버로 보내고 제목과 일정을 받아옴
  useEffect(() => {
    if (isPhotoVisible) {
      const selectedAsset = image && image.assets && image.assets[0]; // 선택한 에셋

      if (selectedAsset) {
        const base64Data = selectedAsset.base64; // 선택한 에셋의 base64 데이터

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
    }
  }, [isPhotoVisible]);

  const handleSubmit = () => {
    if (saveImage) {
      fetch(saveImage)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Data = reader.result;
            const userData = {
              id_key: id_key,
              image: base64Data,
              title: title,
              startDay: startDay,
              endDay: endDay,
            };

            const postData = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            };

            fetch("http://127.0.0.1:8000/addphotopost", postData) // 서버의 API 엔드포인트를 적절히 수정하세요
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error("이미지 저장 실패!");
                }
              });
          };

          reader.readAsDataURL(blob);
        })
        .catch((error) => {
          alert("이미지 데이터 가져오기 오류:", error);
        });
    }

    showPhotoModal(); // 이미지 저장 후 모달 닫기
  };

  return (
    <Modal
      animationType="none" //화면에 띄워질 때 애니메이션
      transparent={true} //모달 화면의 투명도
      visible={isPhotoVisible} //모달 화면의 show 여부
      onRequestClose={showPhotoModal} //뒤로가기 시 모달창 닫음(안드로이드 용)
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.closelocation}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => {
                showPhotoModal();
              }}
            >
              <Image
                source={require("../favicon/X.png")}
                style={styles.closetxt}
              />
            </TouchableOpacity>
          </View>
          {saveImage && (
            <Image
              source={{ uri: saveImage }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <TextInput
            style={[styles.input, { marginTop: 38, marginBottom: 5 }]}
            placeholder="일정 제목"
            placeholderTextColor="#bbbbbb"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, { marginBottom: -3 }]}
            placeholder="일정 시작날짜"
            placeholderTextColor="#bbbbbb"
            value={startDay}
            onChangeText={setStartDay}
          />
          <TextInput
            style={[styles.input, { marginBottom: 0 }]}
            placeholder="일정 종료날짜"
            placeholderTextColor="#bbbbbb"
            value={endDay}
            onChangeText={setEndDay}
          />
          <View style={styles.buttonlocation}>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.text}>등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: 600,
    width: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    width: 330,
    height: 500,
    padding: 20,
    marginTop: 270,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#004898",
  },
  closelocation: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  close: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closetxt: {
    width: 12,
    height: 12,
  },
  input: {
    width: 250,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    padding: 8,
    marginLeft: 15,
  },
  buttonlocation: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  addButton: {
    width: 77,
    height: 30,
    backgroundColor: "#004898",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 20,
    marginHorizontal: 10,
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default Photo;
