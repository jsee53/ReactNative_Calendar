import { configureStore, createSlice } from "@reduxjs/toolkit";

// 리덕스 슬라이스 정의
const idKeySlice = createSlice({
  name: "idKey",
  initialState: 1, // 초기 id_key 값
  reducers: {
    setIdKey: (state, action) => {
      return action.payload;
    },
  },
});

// 슬라이스에서 액션 및 액션 생성자 추출
export const { setIdKey } = idKeySlice.actions;

// 슬라이스 리듀서 추출
const idKeyReducer = idKeySlice.reducer;

// 루트 리듀서 생성
const rootReducer = {
  idKey: idKeyReducer,
  // 다른 리듀서들...
};

// 리덕스 스토어 생성
const store = configureStore({
  reducer: rootReducer,
});

export default store;
