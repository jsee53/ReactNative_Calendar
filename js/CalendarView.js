import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import Schedule from "./Schedule";
import BottomBar from "./BottomBar";
import { useSelector } from "react-redux";
import { tr } from "date-fns/locale";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const [isVisible, setIsVisible] = useState(false); //날짜 클릭시 일정 모달 창 보여주기
  const showModal = () => {
    setIsVisible(!isVisible);
  };

  const id_key = useSelector((state) => state.idKey); // 로그인한 사용자의 id_key
  const [scheduleStartData, setScheduleStartData] = useState([]); //사용자의 일정 시작 날짜
  const [scheduleEndData, setScheduleEndData] = useState([]); //사용자의 일정 종료 날짜

  //일정 바 랜덤 색상
  const getRandomColor = () => {
    const colors = [
      "#A4BDC6", // 라이트 그레이시안
      "#D4AC79", // 바닐라
      "#9CAFB7", // 밝은 스틸 블루
      "#D2C2AC", // 산호
      "#9BA5B2", // 드라이스카이
      "#CBB79D", // 카키
      "#AFBDC1", // 쿨 그레이
      "#C5B198", // 베이지
      "#ADB6BD", // 더스티 블루
      "#B1AFA4", // 모크카
      "#B5B0A1", // 아이보리
      "#C2BCA9", // 선인장
      "#8DA5AE", // 블루 그레이
      "#B8B4A8", // 마른 잔디
      "#B3B7A9", // 플래티넘
      "#D0B9A0", // 머스터드
      "#ADB9C2", // 스트롬 클라우드
      "#B2C2BF", // 민트 그레이
      "#BDB9A4", // 연금색
      "#B6AFA1", // 셀프
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

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
    let randomColor = getRandomColor();

    const startPeriod = {
      startingDay: true,
      endingDay: false,
      color: randomColor,
      textColor: "white",
    };

    const period = {
      startingDay: false,
      endingDay: false,
      color: randomColor,
      textColor: "white",
    };

    const endPeriod = {
      startingDay: false,
      endingDay: true,
      color: randomColor,
      textColor: "white",
    };

    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate < new Date(endDate)) {
      const formattedDate = format(currentDate, "yyyy-MM-dd");
      const dayObj = acc[formattedDate] || {}; // 날짜 객체 가져오기
      const periods = dayObj.periods || []; // periods 배열 가져오기
      periods.push({ ...period, color: randomColor }); // periods에 상태 추가
      dayObj.periods = periods; // 날짜 객체에 periods 배열 설정
      acc[formattedDate] = dayObj; // 수정된 날짜 객체를 markedDates 객체에 할당
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const endDayObj = acc[endDate] || {}; // 종료 날짜 객체 가져오기
    const endPeriods = endDayObj.periods || []; // periods 배열 가져오기
    endPeriods.push(endPeriod); // periods에 종료 날짜 상태 추가
    endDayObj.periods = endPeriods; // 종료 날짜 객체에 periods 배열 설정
    acc[endDate] = endDayObj; // 수정된 종료 날짜 객체를 markedDates 객체에 할당

    const startDayObj = acc[startDate] || {}; // 시작 날짜 객체 가져오기
    const startPeriods = startDayObj.periods || []; // periods 배열 가져오기
    startPeriods.push(startPeriod); // periods에 시작 날짜 상태 추가
    startDayObj.periods = startPeriods; // 시작 날짜 객체에 periods 배열 설정
    acc[startDate] = startDayObj; // 수정된 시작 날짜 객체를 markedDates 객체에 할당

    return acc;
  }, {});

  console.log(markedDates);

  return (
    <View>
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
