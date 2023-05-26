import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Bar from "./js/Bar";
import Login from "./js/Login";
import CalendarView from "./js/CalendarView";
import Signup from "./js/Signup";

const App = () => {
  const [login, setLogin] = useState(false);
  const [signup, setsignup] = useState(false);

  //로그인 성공 여부 확인
  const successLogin = (data) => {
    setLogin(true);
    console.log(data);
  };

  const signup_show = () => {
    //로그인 화면에서 회원가입 클릭 시
    setsignup(!signup);
  };

  return (
    <View>
      <Bar />
      {login ? (
        <CalendarView />
      ) : signup ? (
        <Signup successLogin={successLogin} signup_show={signup_show} />
      ) : (
        <Login successLogin={successLogin} signup_show={signup_show} />
      )}
    </View>
  );
};

export default App;
