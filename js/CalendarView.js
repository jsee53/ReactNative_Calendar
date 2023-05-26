import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import Schedule from "./Schedule";
import BottomBar from "./BottomBar";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [posts, setPosts] = useState([
    "2023-05-23",
    "2023-05-23",
    "2023-05-24",
  ]);

  const [showSchedule, setShowSchedule] = useState(false);

  const markedDates = posts.reduce((acc, current) => {
    acc[current] = { marked: true };
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
      <Calendar
        style={{
          marginTop: 20,
          height: 350,
          width: 300,
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
          setShowSchedule(true); //선택한 날짜의 Schedule 컴포넌트를 보여줌
        }}
        monthFormat={"yyyy년 MM월"}
        // 기본 화살표를 커스텀화살표로 대체 (방향은 '왼쪽'이나 '오른쪽')
        renderArrow={(direction) =>
          direction === "left" ? <div>이전달</div> : <div>다음달</div>
        }
        // 이번 달 페이지에 다른 달 숫자를 보이지 않게 함, Default = false
        hideExtraDays={true}
      />
      <div>
        {showSchedule === true ? ( //날짜 선택시 보여줄 Schedule 컴포넌트
          <Schedule date={selectedDate} />
        ) : null}
      </div>
      <BottomBar />
    </View>
  );
}

export default CalendarView;
