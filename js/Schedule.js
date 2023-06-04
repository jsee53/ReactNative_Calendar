import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Modal } from "react-native";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import AddPost from "./AddPost";
import Icon from "react-native-vector-icons/FontAwesome";

//일정 클릭 시 일정을 보여주는 모달 컴포넌트
function Schedule({ isVisible, showModal, selectedDate }) {
  const [isAddPostVisible, setIsVisible] = useState(false); //날짜 클릭시 일정 모달 창 보여주기
  const [scheduleTitle, setScheduleTitle] = useState([]); //해당 날짜의 일정 제목

  //해당 모달창을 보여줄지 여부
  const showAddPostModal = () => {
    setIsVisible(!isAddPostVisible);
  };

  //제목 앞에 보여질 랜덤 색상
  const getRandomColor = () => {
    const colors = [
      "lightblue",
      "lightskyblue",
      "mediumaquamarine",
      "palegreen",
      "mediumspringgreen",
      "limegreen",
      "lightgreen",
      "mediumseagreen",
      "lightsteelblue",
      "paleturquoise",
      "mediumturquoise",
      "aquamarine",
      "lightyellow",
      "palegoldenrod",
      "khaki",
      "lemonchiffon",
      "lightpink",
      "lightcoral",
      "lightsalmon",
      "peachpuff",
      "lightgoldenrodyellow",
      "moccasin",
      "pink",
      "lavenderblush",
      "thistle",
      "plum",
      "mediumorchid",
      "mediumvioletred",
      "lavender",
      "cornflowerblue",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    const scheduleData = {
      id_key: 1,
      selectedDate: selectedDate,
    };

    // 서버로 전송할 데이터 객체(아이디 Key, 날짜)
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduleData),
    };

    fetch("http://127.0.0.1:8000/schedule", postData)
      .then((response) => {
        if (response.ok) {
          // 요청이 성공한 경우
          return response.json(); // JSON 형식으로 변환된 응답 반환
        } else {
          // 요청이 실패한 경우
          alert("일정 불러오기 실패했습니다.");
        }
      })
      .then((data) => {
        // 서버에서 반환한 데이터 처리
        setScheduleTitle(data.schedule);
      });
  }, [selectedDate, isAddPostVisible]);

  return (
    <Modal
      animationType="slide" //화면에 띄워질 때 애니메이션
      transparent={true} //모달 화면의 투명도
      visible={isVisible} //모달 화면의 show 여부
      onRequestClose={showModal} //뒤로가기 시 모달창 닫음(안드로이드 용)
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={showModal}>
            <Text>X</Text>
          </TouchableOpacity>
          <Text>
            {format(new Date(selectedDate), "M월 d일 EEEE", { locale: ko })}
          </Text>
          {scheduleTitle.length === 0 ? (
            <Text>일정이 없습니다.</Text>
          ) : (
            scheduleTitle.map((scheduleItem) => (
              <Text key={scheduleItem.id}>
                <Icon name="circle" size={16} color={getRandomColor()} />
                {scheduleItem.title}
              </Text>
            ))
          )}
          <TouchableOpacity
            style={styles.addButton} // 스타일 추가
            onPress={showAddPostModal}
          >
            <Text>추가</Text>
          </TouchableOpacity>
          <AddPost
            isAddPostVisible={isAddPostVisible}
            showAddPostModal={showAddPostModal}
            selectedDate={selectedDate}
          />
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
  addButton: {
    marginTop: 10,
    backgroundColor: "lightblue",
    padding: 10,
    alignItems: "center",
  },
});

export default Schedule;
