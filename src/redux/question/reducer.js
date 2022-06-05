import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    amount: 1,
    maxQuestions: 11,
  },
  reducers: {
    getQuestionSuccess: (state, action) => {
      state.questions = action.payload.results;
      state.maxQuestions = action.payload.totalResults;
    },
    changeAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const { getQuestionSuccess, changeAmount } = questionSlice.actions;

export default questionSlice.reducer;
