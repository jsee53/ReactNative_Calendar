import React, { useState } from "react";
import { View, StatusBar } from "react-native";
import Bar from "./js/Bar";
import Login from "./js/Login";
import CalendarView from "./js/CalendarView";
import Signup from "./js/Signup";
import { Provider } from "react-redux";
import store from "./js/Store";

const App = () => {
  const [login, setLogin] = useState(true);
  const [signup, setsignup] = useState(false);

  //로그인 성공 여부 확인
  const successLogin = (data) => {
    setLogin(data);
  };

  const signup_show = () => {
    //로그인 화면에서 회원가입 클릭 시
    setsignup(!signup);
  };

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      {login ? (
        <View>
          <Bar />
          <Provider store={store}>
            <CalendarView />
          </Provider>
        </View>
      ) : signup ? (
        <Provider store={store}>
          <Signup successLogin={successLogin} signup_show={signup_show} />
        </Provider>
      ) : (
        <Provider store={store}>
          <Login successLogin={successLogin} signup_show={signup_show} />
        </Provider>
      )}
    </View>
  );
};

export default App;
