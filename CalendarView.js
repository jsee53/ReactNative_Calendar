import React, { useContext, useState, useEffect } from "react";
import { View, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { StyleSheet } from "react-native";

function CalendarView() {
  const [newPostTitle, setNewPostTitle] = useState(""); //사용자가 입력한 일정의 제목
  const [newPostDate, setNewPostDate] = useState(""); //사용자가 입력한 날짜
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [posts, setPosts] = useState([]);

  //게시물 추가
  const addPost = () => {
    // 입력값 유효성 검사
    if (newPostTitle.trim() === "") {
      alert("일정의 제목을 입력하세요.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(newPostDate)) {
      alert("올바른 날짜 형식을 입력하세요. (yyyy-MM-dd)");
      return;
    }

    const newPost = {
      title: newPostTitle,
      date: newPostDate,
    };

    // 서버로 전송할 데이터 객체
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    };

    fetch("http://127.0.0.1:8000/main", postData)
      .then((response) => {
        if (response.ok) {
          // 요청이 성공한 경우
          setPosts([...posts, newPost]);
          setNewPostTitle("");
          setNewPostDate("");
          return response.json(); // JSON 형식으로 변환된 응답 반환
        } else {
          // 요청이 실패한 경우
          console.error("게시물 추가에 실패했습니다.");
        }
      })
      .then((data) => {
        // 서버에서 반환한 데이터 처리
        console.log(data.title);
        console.log(data.date);
        console.log(data.message); // "서버로 부터 받은 게시물이 추가되었습니다. 메시지"
      })
      .catch((error) => {
        console.error("게시물 추가 중 오류가 발생했습니다.", error);
      });
  };

  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), "yyyy-MM-dd");
    acc[formattedDate] = { marked: true };
    return acc;
  }, {});

  //선택한 날짜의 스타일 적용
  const markedSelectedDates = {
    ...markedDates, //markedDates 객체 복사, 스타일 적용 후 markedSelectedDates에 저장
    [selectedDate]: {
      selected: true, //선택한 날짜
      selectedDotColor: "orange",
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    <View>
      <div
        style={{
          marginTop: 20,
          borderWidth: 1,
          borderColor: "gray",
        }}
      >
        <input
          type="text"
          placeholder="제목"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="날짜 (yyyy-MM-dd)"
          value={newPostDate}
          onChange={(e) => setNewPostDate(e.target.value)}
        />
        <button onClick={addPost}>게시물 추가</button>
      </div>

      <Calendar
        style={{
          marginTop: 20,
          borderWidth: 1,
          borderColor: "gray",
          height: 350,
          width: 350,
        }}
        markedDates={markedSelectedDates}
        theme={{
          calendarBackground: "white", //캘린더 배경색
          textSectionTitleColor: "black", //월 ~ 일요일 색상
          selectedDayBackgroundColor: "rgb(33, 150, 243)", //선택된 날짜 배경색
          selectedDayTextColor: "white", //선택된 날짜 글자 색상
          todayTextColor: "black", //오늘 날짜 글자 색상
          dayTextColor: "black", //일반 날짜 글자 색상
        }}
        //날짜 선택시 실행될 함수
        onDayPress={(day) => {
          setSelectedDate(day.dateString); //선택한 날짜를 selectedDate에 저장
        }}
        monthFormat={"yyyy년 MM월"}
        // 기본 화살표를 커스텀화살표로 대체 (방향은 '왼쪽'이나 '오른쪽')
        renderArrow={(direction) =>
          direction === "left" ? <div>방향키(좌)</div> : <div>방향키(우)</div>
        }
        // 이번 달 페이지에 다른 달 숫자를 보이지 않게 함, Default = false
        hideExtraDays={true}
      />
    </View>
  );
}

export default CalendarView;
