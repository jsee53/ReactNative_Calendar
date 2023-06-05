import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import Schedule from "./Schedule";
import BottomBar from "./BottomBar";
import { useSelector } from "react-redux";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const [isVisible, setIsVisible] = useState(false); //날짜 클릭시 일정 모달 창 보여주기
  const showModal = () => {
    setIsVisible(!isVisible);
  };

  const id_key = useSelector((state) => state.idKey); // 로그인한 사용자의 id_key
  const [scheduleData, setScheduleData] = useState([]); //사용자의 일정정보

  useEffect(() => {
    const fetchData = () => {
      const userData = {
        id_key: id_key,
      };

      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };

      fetch("http://127.0.0.1:8000/calendar", postData)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("일정 불러오기 실패!");
          }
        })
        .then((data) => {
          // 시간 부분을 제외하고 날짜 부분만 저장
          setScheduleData(data.schedule_data.map((date) => date.split("T")[0]));
        })
        .catch((error) => {
          console.error("일정 불러오기 오류!", error);
        });
    };

    fetchData();
  }, [id_key, isVisible]);

  const markedDates = scheduleData.reduce((acc, current) => {
    acc[current] = { marked: true };
    return acc;
  }, {});

  //사용자 일정이 존재하는 날짜에 스타일 적용
  const markedSelectedDates = {
    ...markedDates, //markedDates 객체 복사, 스타일 적용 후 markedSelectedDates에 저장
    [selectedDate]: {
      selected: true, //일정
      selectedDotColor: "orange",
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    <View>
      <Calendar
        style={{
          marginTop: 20,
          height: 600,
          width: 393,
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
          setIsVisible(true); //선택한 날짜의 Schedule 컴포넌트를 보여줌
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
        <Schedule
          isVisible={isVisible}
          showModal={showModal}
          selectedDate={selectedDate}
        />
      </div>
      <BottomBar />
    </View>
  );
}

export default CalendarView;
