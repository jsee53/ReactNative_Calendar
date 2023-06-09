import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { setIdKey } from "./Store";

const Signup = ({ successLogin, signup_show }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [isIdInputEmpty, setIdInputEmpty] = useState(true); // 추가된 코드
  const [isPasswordInputEmpty, setPasswordInputEmpty] = useState(true); // 추가된 코드
  const [isNameInputEmpty, setNameInputEmpty] = useState(true); // 추가된 코드
  const [isBirthDateInputEmpty, setBirthDateInputEmpty] = useState(true); // 추가된 코드
  const [isEmailInputEmpty, setEmailInputEmpty] = useState(true); // 추가된 코드

  const dispatch = useDispatch();

  const handleIdChange = (text) => {
    // 추가된 코드
    setId(text);
    setIdInputEmpty(text.length === 0);
  };

  const handlePasswordChange = (text) => {
    // 추가된 코드
    setPassword(text);
    setPasswordInputEmpty(text.length === 0);
  };

  const handleNameChange = (text) => {
    // 추가된 코드
    setName(text);
    setNameInputEmpty(text.length === 0);
  };

  const handleBirthDateChange = (text) => {
    // 추가된 코드
    setBirthDate(text);
    setBirthDateInputEmpty(text.length === 0);
  };

  const handleEmailChange = (text) => {
    // 추가된 코드
    setEmail(text);
    setEmailInputEmpty(text.length === 0);
  };

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
          dispatch(setIdKey(data.id_key)); //로그인 한 사용자의 id_key 값을 저장
          successLogin(data.successSignup);
        } else {
          //회원가입 실패 시
          alert("회원가입 실패!");
        }
      });
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.startcontainer}> */}
      <Text style={styles.title}>Join</Text>
      {/* </View>
      <View style={styles.inputcontainer}> */}
      <TextInput
        style={[styles.input, isIdInputEmpty ? styles.empty : styles.filled]} // 변경된 코드
        placeholder="ID"
        onChangeText={handleIdChange}
        value={id}
      />
      <TextInput
        style={[
          styles.input,
          isPasswordInputEmpty ? styles.empty : styles.filled,
        ]} // 변경된 코드
        placeholder="PW"
        secureTextEntry
        onChangeText={handlePasswordChange}
        value={password}
      />
      <TextInput
        style={[styles.input, isNameInputEmpty ? styles.empty : styles.filled]} // 변경된 코드
        placeholder="Name"
        onChangeText={handleNameChange}
        value={name}
      />
      <TextInput
        style={[
          styles.input,
          isBirthDateInputEmpty ? styles.empty : styles.filled,
        ]} // 변경된 코드
        placeholder="Birthday ex) 19980917"
        onChangeText={handleBirthDateChange}
        value={birthDate}
      />
      <TextInput
        style={[styles.input, isEmailInputEmpty ? styles.empty : styles.filled]} // 변경된 코드
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
      />
      {/* </View> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={signup_show}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>확인</Text>
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
    justifyContent: "center",
    alignContent: "center",
  },
  inputcontainer: {
    flex: 3,
    justifyContent: "center",
    alignContent: "center",
  },
  buttonContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    marginBottom: 50,
  },
  input: {
    width: 170,
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
  empty: {
    color: "#bbbbbb",
  },
  filled: {
    color: "black",
  },
});

export default Signup;
