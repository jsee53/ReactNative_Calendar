import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Signup = ({ successLogin, signup_show }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = () => {
    const userData = {
      id: id,
      password: password,
      name: name,
      birthDate: birthDate,
      email: email,
    };

    // 서버로 전송할 데이터 객체(사용자 정보)
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    fetch("http://127.0.0.1:8000/signup", postData)
      .then((response) => {
        if (response.ok) {
          // 요청이 성공한 경우
          return response.json(); // JSON 형식으로 변환된 응답 반환
        } else {
          // 요청이 실패한 경우
          alert("회원가입이 실패했습니다.");
        }
      })
      .then((data) => {
        // 서버에서 반환한 데이터 처리
        if (data.successSignup) {
          //회원가입 성공 시 ClanedarView 페이지로 이동
          alert("회원가입 성공!");
          successLogin();
        } else {
          //회원가입 실패 시
          alert("회원가입 실패!");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        onChangeText={(text) => setId(text)}
        value={id}
      />
      <TextInput
        style={styles.input}
        placeholder="PW"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="이름"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="생년월일 ex) 19980917"
        onChangeText={(text) => setBirthDate(text)}
        value={birthDate}
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={signup_show}>
            취소
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    width: "160",
    height: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "77",
    height: 27,
    backgroundColor: "#004898",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default Signup;
