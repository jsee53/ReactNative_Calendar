import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Provider, useSelector, useDispatch } from "react-redux";
import store, { setIdKey } from "./Store";

const Login = ({ successLogin, signup_show }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = () => {
    const userData = {
      id: id,
      password: password,
    };

    // 서버로 전송할 데이터 객체(아이디, 비밀번호)
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    fetch("http://127.0.0.1:8000/login", postData)
      .then((response) => {
        if (response.ok) {
          // 요청이 성공한 경우
          return response.json(); // JSON 형식으로 변환된 응답 반환
        } else {
          // 요청이 실패한 경우
          alert("로그인이 실패!");
        }
      })
      .then((data) => {
        // 서버에서 반환한 데이터 처리
        if (data.login_result) {
          successLogin(data.login_result);
          dispatch(setIdKey(data.id_key)); //로그인 한 사용자의 id_key 값을 저장
        } else {
          alert("아이디 또는 비밀번호 오류!!");
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.startcontainer}>
        <Text style={styles.title}>AuViS</Text>
      </View>
      <View style={styles.inputcontainer}>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={signup_show}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
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
    paddingTop: 300, // 추가된 스타일
  },
  startcontainer: {
    flex: 1,
  },
  inputcontainer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 5,
    flexDirection: "row",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    marginBottom: 20,
    color: "black",
  },
  input: {
    width: 170, // 수정된 스타일
    height: 30,
    color: "#bbbbbb",
    borderWidth: 1,
    borderColor: "#004898",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: 77,
    height: 30,
    backgroundColor: "#004898",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default Login;
