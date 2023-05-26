import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { random } from "lodash";
import Icon from "react-native-vector-icons/FontAwesome";
import AddPost from "./AddPost";

function Schedule({ date }) {
  const [scheduleData, setScheduleData] = useState([]);
  const formattedDate = format(new Date(date), "yyyy-MM-dd");
  const [showAddPost, setShowAddPost] = useState(false);

  const addShow = () => {
    setShowAddPost(!showAddPost);
  };

  const dateData = {
    date: date,
  };

  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dateData),
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/schedule", postData)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("일정 불러오기 실패!");
        }
      })
      .then((data) => {
        setScheduleData(data.schedule);
      })
      .catch((error) => {
        console.error("일정 로드 중 오류가 발생했습니다.", error);
      });
  }, []); // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 마운트될 때만 실행되도록 설정

  const getRandomColor = () => {
    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "orange",
      "purple",
      "pink",
      "teal",
      "brown",
      "cyan",
      "magenta",
      "lime",
      "indigo",
      "salmon",
      "turquoise",
      "coral",
      "violet",
      "peach",
      "gold",
      "olive",
      // Add more eye-catching colors here
      "crimson",
      "chartreuse",
      "orchid",
      "aqua",
      "tomato",
      "deepskyblue",
      "hotpink",
      "limegreen",
      "royalblue",
      "sandybrown",
    ];

    const randomIndex = random(0, colors.length - 1);
    return colors[randomIndex];
  };

  return (
    <View style={styles.container}>
      <Text>{formattedDate}</Text>
      {scheduleData.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <Icon
            name="circle"
            size={12}
            color={getRandomColor()}
            style={styles.circleIcon}
          />
          <Text style={styles.dateText}>{item.title}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button}></TouchableOpacity>
      <View>
        {showAddPost ? (
          <AddPost addShow={addShow} />
        ) : (
          <Text style={styles.buttonText} onPress={() => setShowAddPost(true)}>
            추가
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 18,
  },
});

export default Schedule;
