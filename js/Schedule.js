import React from "react";
import { format } from "date-fns";

function Schedule({ date }) {
  //선택한 날짜를 date로 받아옴
  const formattedDate = format(new Date(date), "yyyy-MM-dd");

  const dateData = {
    date: date,
  };

  // 서버로 전송할 데이터 객체(날짜)
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dateData),
  };

  fetch("http://127.0.0.1:8000/schedule", postData)
    .then((response) => {
      if (response.ok) {
        // 요청이 성공한 경우
        return response.json(); // JSON 형식으로 변환된 응답 반환
      } else {
        // 요청이 실패한 경우
        console.error("일정 불러오기 실패!");
      }
    })
    .then((data) => {
      // 서버에서 반환한 데이터 처리
      console.log(data);
      console.log(data.message);
    })
    .catch((error) => {
      console.error("일정 로드 중 오류가 발생했습니다.", error);
    });

  return (
    <div>
      <h2>{formattedDate}</h2>
    </div>
  );
}

export default Schedule;
