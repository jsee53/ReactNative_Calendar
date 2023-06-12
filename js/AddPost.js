import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Modal } from "react-native";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import { useSelector } from "react-redux";

//일정 추가 모달 컴포넌트
function AddPost({
  isAddPostVisible,
  showModal,
  showAddPostModal,
  selectedDate,
}) {
  const [postTitle, setPostTitle] = useState(""); // 일정 제목 상태 관리
  const [startDay, setStartDay] = useState(""); // 일정 시작 날짜
  const [endDay, setEndDay] = useState(""); // 일정 종료 날짜
  const id_key = useSelector((state) => state.idKey); // 로그인한 사용자의 id_key

  const handleSubmit = () => {
    const DateData = {
      id_key: id_key,
      title: postTitle,
      startDay: startDay,
      endDay: endDay,
    };

    // 서버로 전송할 데이터 객체(아이디, 제목, 날짜)
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DateData),
    };

    fetch("http://127.0.0.1:8000/addpost", postData).then((response) => {
      if (response.ok) {
        // 요청이 성공한 경우
        return response.json(); // JSON 형식으로 변환된 응답 반환
      } else {
        // 요청이 실패한 경우
        alert("일정 추가 실패!");
      }
    });

    // 전송 후 모달 창 닫음
    showAddPostModal();
    showModal();
  };

  return (
    <Modal
      animationType="none" //화면에 띄워질 때 애니메이션
      transparent={true} //모달 화면의 투명도
      visible={isAddPostVisible} //모달 화면의 show 여부
      onRequestClose={showAddPostModal} //뒤로가기 시 모달창 닫음(안드로이드 용)
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.closelocation}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => {
                showModal();
                showAddPostModal();
              }}
            >
              <Image
                source={require("../favicon/X.png")}
                style={styles.closetxt}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.day}>
            {format(new Date(selectedDate), "M월 d일 EEEE", { locale: ko })}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                marginBottom: 50,
                textAlignVertical: "center", // placeholder 박스 수평 가운데 정렬
              }, // 첫 번째 placeholder 간격 조정
            ]}
            placeholder="제목"
            placeholderTextColor="#bbbbbb"
            value={postTitle}
            onChangeText={setPostTitle}
          />
          <TextInput
            style={[styles.input, { marginBottom: 20 }]}
            placeholder="시작 ex) 20230302"
            placeholderTextColor="#bbbbbb"
            value={startDay}
            onChangeText={setStartDay}
          />
          <TextInput
            style={[styles.input, { marginBottom: 20 }]}
            placeholder="종료 ex) 20230616"
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
  day: {
    marginLeft: 20,
    paddingBottom: 20,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: 500,
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
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

export default AddPost;
