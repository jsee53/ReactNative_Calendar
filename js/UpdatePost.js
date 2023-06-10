import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { Modal } from "react-native";
import { useSelector } from "react-redux";

//일정 추가 모달 컴포넌트
function UpdatePost({
  isUpdatePostVisible,
  showModal,
  showUpdatePostModal,
  selectedScheduleId,
}) {
  const [postTitle, setPostTitle] = useState(""); // 일정 제목 상태 관리
  const [startDay, setStartDay] = useState(""); // 일정 시작 날짜
  const [endDay, setEndDay] = useState(""); // 일정 종료 날짜
  const id_key = useSelector((state) => state.idKey); // 로그인한 사용자의 id_key

  useEffect(() => {
    if (selectedScheduleId !== 0) {
      // 만약 selectedScheduleId가 0이 아니라면
      const DateData = {
        title_key: selectedScheduleId,
      };

      // 서버로 전송할 데이터 객체(아이디, 제목, 날짜)
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DateData),
      };

      fetch("http://127.0.0.1:8000/updatepost", postData)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("선택 일정 불러오기 실패!");
          }
        })
        .then((data) => {
          setPostTitle(data.title);
          setStartDay(data.start_date.split("T")[0]);
          setEndDay(data.end_date.split("T")[0]);
        })
        .catch((error) => {
          console.error("선택 일정 불러오기 오류!", error);
        });
    }
  }, [showUpdatePostModal]);

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

    fetch("http://127.0.0.1:8000/updateresult", postData).then((response) => {
      if (response.ok) {
        // 요청이 성공한 경우
        return response.json(); // JSON 형식으로 변환된 응답 반환
      } else {
        // 요청이 실패한 경우
        alert("일정 수정 실패!");
      }
    });

    // 전송 후 모달 창 닫음
    showUpdatePostModal, showUpdatePostModal();
    showModal();
  };

  return (
    <Modal
      animationType="none" //화면에 띄워질 때 애니메이션
      transparent={true} //모달 화면의 투명도
      visible={isUpdatePostVisible} //모달 화면의 show 여부
      onRequestClose={showUpdatePostModal} //뒤로가기 시 모달창 닫음(안드로이드 용)
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => {
              showModal();
              showUpdatePostModal();
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="일정 제목"
            value={postTitle}
            onChangeText={setPostTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="일정 시작날짜"
            value={startDay}
            onChangeText={setStartDay}
          />
          <TextInput
            style={styles.input}
            placeholder="일정 종료날짜"
            value={endDay}
            onChangeText={setEndDay}
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

export default UpdatePost;