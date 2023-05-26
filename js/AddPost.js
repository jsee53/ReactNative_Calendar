import React, { useState } from "react";
import { View, Button, TouchableOpacity } from "react-native";

function AddPost({ addShow }) {
  const [newPostTitle, setNewPostTitle] = useState(""); //사용자가 입력한 일정의 제목
  const [newPostDate, setNewPostDate] = useState(""); //사용자가 입력한 날짜
  const [posts, setPosts] = useState([]);

  //게시물 추가
  const addPost = () => {
    // 입력값 유효성 검사
    if (newPostTitle.trim() === "") {
      alert("일정의 제목을 입력하세요.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(newPostDate)) {
      alert("올바른 날짜 형식을 입력하세요. (1999-05-03)");
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

  return (
    <View>
      <div>
        <input
          type="text"
          placeholder="제목"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="날짜 (2023-05-26)"
          value={newPostDate}
          onChange={(e) => setNewPostDate(e.target.value)}
        />
        <button onClick={addPost}>게시물 추가</button>
      </div>
      <button onClick={addShow}>닫기</button>
    </View>
  );
}

export default AddPost;
