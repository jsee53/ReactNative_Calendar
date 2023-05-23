import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Bar from "./js/Bar";
import CalendarView from "./js/CalendarView";
import Login from "./js/Login";
import Signup from "./js/Signup";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isCalendar, setIsCalendar] = useState(false);

  return (
    <View style={styles.container}>
      <Bar />
      <View style={styles.buttonContainer}>
        <Button title="로그인" onPress={() => setIsLogin(!isLogin)} />
      </View>
      {isLogin ? <Login /> : null}

      <View style={styles.buttonContainer}>
        <Button title="회원가입" onPress={() => setIsSignup(!isSignup)} />
      </View>
      {isSignup ? <Signup /> : null}

      <View style={styles.buttonContainer}>
        <Button title="캘린더" onPress={() => setIsCalendar(!isCalendar)} />
      </View>
      {isCalendar ? <CalendarView /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    width: 200, // 유효한 너비 값으로 수정
  },
});

export default App;
