import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { Modal } from "react-native";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import Bar from "./Bar";

//일정 추가 모달 컴포넌트
function AddPost({
  isAddPostVisible,
  showModal,
  showAddPostModal,
  selectedDate,
}) {
  const [postTitle, setPostTitle] = useState(""); // 일정 제목 상태 관리
  const [postDate, setPostDate] = useState(selectedDate); // 일정 날짜 상태 관리

  const handleSubmit = () => {
    const DateData = {
      id_key: 1,
      title: postTitle,
      date: postDate,
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
      <Bar />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => {
              showModal();
              showAddPostModal();
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <Text>
            {format(new Date(selectedDate), "M월 d일 EEEE", { locale: ko })}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="일정 제목"
            value={postTitle}
            onChangeText={setPostTitle}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>제출</Text>
          </TouchableOpacity>
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

export default AddPost;
