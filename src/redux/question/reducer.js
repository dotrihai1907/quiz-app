import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    amount: 1,
    maxQuestions: 1000,
    questionsAdmin: [],
  },
  reducers: {
    getQuestionSuccess: (state, action) => {
      state.questions = action.payload.results;
      state.maxQuestions = action.payload.totalResults;
    },
    changeAmount: (state, action) => {
      state.amount = action.payload;
    },
    getQuestionsAdminSuccess: (state, action) => {
      state.questionsAdmin = action.payload;
    },
    updateQuestionSuccess: (state, action) => {
      state.questionsAdmin.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return state.questionsAdmin;
      });
    },
  },
});

export const {
  getQuestionSuccess,
  changeAmount,
  getQuestionsAdminSuccess,
  updateQuestionSuccess,
} = questionSlice.actions;

export default questionSlice.reducer;
