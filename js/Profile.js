import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { Modal } from "react-native";

const Profile = ({ isProfileVisible, handleProfile }) => {
  const id_key = useSelector((state) => state.idKey); // 로그인한 사용자의 id_key
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = () => {
      const userData = {
        id_key: id_key,
      };

      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };

      fetch("http://127.0.0.1:8000/profile", postData)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("사용자 정보 불러오기 실패!");
          }
        })
        .then((data) => {
          setUserId(data.user_id);
          setUserName(data.user_name);
          setBirthDate(data.date_of_birth.substring(0, 10));
          setEmail(data.email);
        })
        .catch((error) => {
          console.error("Error fetching schedule data:", error);
        });
    };

    fetchData();
  }, []);

  return (
    <Modal
      animationType="none" // 화면에 띄워질 때 애니메이션
      transparent={false} // 모달 화면의 투명도
      visible={isProfileVisible} // 모달 화면의 show 여부
      onRequestClose={handleProfile} // 뒤로가기 시 모달창 닫음(안드로이드 용)
    >
      <View style={styles.container}>
        <Text style={styles.title}>사용자 정보</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>아이디:</Text>
          <Text style={styles.value}>{userId}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>이름:</Text>
          <Text style={styles.value}>{userName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>생년월일:</Text>
          <Text style={styles.value}>{birthDate}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>이메일:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#004898" }]}
            onPress={handleProfile} // 취소 버튼 눌렀을 때 모달창 닫음
          >
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Profile;
