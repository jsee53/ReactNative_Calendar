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
  const [scheduleStartData, setScheduleStartData] = useState([]); //사용자의 일정 시작 날짜
  const [scheduleEndData, setScheduleEndData] = useState([]); //사용자의 일정 종료 날짜

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
          if (Array.isArray(data) && data.length > 0) {
            setScheduleStartData(
              data.map((item) => item.start_date.split("T")[0])
            );
            setScheduleEndData(data.map((item) => item.end_date.split("T")[0]));
          }
        })
        .catch((error) => {
          console.error("일정 불러오기 오류!", error);
        });
    };

    fetchData();
  }, [id_key, isVisible]);

  const markedDates = scheduleStartData.reduce((acc, current, index) => {
    const startDate = current;
    const endDate = scheduleEndData[index];
    const startPeriod = {
      startingDay: true,
      endingDay: false,
      color: "blue",
      textColor: "white",
    };

    const period = {
      startingDay: false,
      endingDay: false,
      color: "blue",
      textColor: "white",
    };

    const endPeriod = {
      startingDay: false,
      endingDay: true,
      color: "blue",
      textColor: "white",
    };

    acc[startDate] = startPeriod;

    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate < new Date(endDate)) {
      const formattedDate = format(currentDate, "yyyy-MM-dd");
      acc[formattedDate] = { ...period, color: "blue" };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    acc[endDate] = endPeriod;

    return acc;
  }, {});

  return (
    <View>
      <Bar />
      <Calendar
        style={{
          marginTop: 20,
          height: 600,
          width: 393,
        }}
        markingType="multi-period"
        markedDates={markedDates}
        theme={{
          calendarBackground: "white", //캘린더 배경색
          textSectionTitleColor: "black", //월 ~ 일요일 색상
          selectedDayTextColor: "blue", //선택된 날짜 글자 색상
          todayTextColor: "blue", //오늘 날짜 글자 색상
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
      <view>
        <Schedule
          isVisible={isVisible}
          showModal={showModal}
          selectedDate={selectedDate}
        />
      </view>
      <BottomBar />
    </View>
  );
}

export default CalendarView;
