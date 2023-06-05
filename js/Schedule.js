import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Modal } from "react-native";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import AddPost from "./AddPost";
import Bar from "./Bar";

//일정 클릭 시 일정을 보여주는 모달 컴포넌트
function Schedule({ isVisible, showModal, selectedDate }) {
  const [isAddPostVisible, setIsVisible] = useState(false); //날짜 클릭시 일정 모달 창 보여주기
  const showAddPostModal = () => {
    setIsVisible(!isAddPostVisible);
  };

  return (
    <Modal
      animationType="slide" //화면에 띄워질 때 애니메이션
      transparent={true} //모달 화면의 투명도
      visible={isVisible} //모달 화면의 show 여부
      onRequestClose={showModal} //뒤로가기 시 모달창 닫음(안드로이드 용)
    >
      <Bar />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={showModal}>
            <Text>X</Text>
          </TouchableOpacity>
          <Text>
            {format(new Date(selectedDate), "M월 d일 EEEE", { locale: ko })}
          </Text>
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
