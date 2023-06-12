import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Modal } from "react-native";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import { Provider } from "react-redux";
import store from "./Store";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import AddPost from "./AddPost";
import UpdatePost from "./UpdatePost";

//일정 클릭 시 일정을 보여주는 모달 컴포넌트
function Schedule({ isVisible, showModal, selectedDate }) {
  const [isAddPostVisible, setIsAddPostVisible] = useState(false); //날짜 클릭시 일정 모달 창 보여주기
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(0);
  const [isUpdatePostVisible, setIsUpdatePostVisible] = useState(false); //일정 클릭시 일정 수정 모달 창 보여주기
  const id_key = useSelector((state) => state.idKey); // 로그인한 사용자의 id_key

  //해당 모달창을 보여줄지 여부
  const showAddPostModal = () => {
    setIsAddPostVisible(!isAddPostVisible);
  };

  //일정 클릭시 화면에 보여질 모달창의 show 여부
  const showUpdatePostModal = () => {
    setIsUpdatePostVisible(!isUpdatePostVisible);
  };

  //일정 클릭시 화면에 보여질 모달창의 show 여부
  const handleTitleClick = (schedule_id) => {
    setSelectedScheduleId(schedule_id);
    showUpdatePostModal();
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
    if (isVisible) {
      const scheduleData = {
        id_key: id_key,
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
          const scheduleData = data.schedule.map((schedule) => ({
            title: schedule.title,
            id: schedule.schedule_id,
          }));
          setScheduleData(scheduleData);
        });
    }
  }, [isVisible]);

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
          {scheduleData.length === 0 ? (
            <Text>일정이 없습니다.</Text>
          ) : (
            scheduleData.map((scheduleItem, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTitleClick(scheduleItem.id)}
              >
                <Text>
                  <Icon name="circle" size={16} color={getRandomColor()} />
                  {scheduleItem.title}
                </Text>
              </TouchableOpacity>
            ))
          )}
          <TouchableOpacity
            style={styles.addButton} // 스타일 추가
            onPress={showAddPostModal}
          >
            <Text>추가</Text>
          </TouchableOpacity>
          <Provider store={store}>
            <AddPost
              isAddPostVisible={isAddPostVisible}
              showModal={showModal}
              showAddPostModal={showAddPostModal}
              selectedDate={selectedDate}
            />
          </Provider>
          <UpdatePost
            isUpdatePostVisible={isUpdatePostVisible}
            showModal={showModal}
            showUpdatePostModal={showUpdatePostModal}
            selectedScheduleId={selectedScheduleId}
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
