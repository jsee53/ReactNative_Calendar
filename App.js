import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import CalendarView from "./CalendarView";
import Login from "./Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View>
      {isLoggedIn ? <CalendarView /> : <Login />}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>화면전환</button>
    </View>
  );
};

export default App;
