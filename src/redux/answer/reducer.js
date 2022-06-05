import { createSlice } from "@reduxjs/toolkit";

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    answers: [],
  },
  reducers: {
    saveAnswer: (state, action) => {
      const answered = state.answers.find(
        (answer) => answer.id === action.payload.id
      );
      if (answered === undefined) {
        state.answers = [...state.answers, action.payload];
      } else {
        state.answers.map((answer) => {
          if (answer.id === action.payload.id) {
            answer.correctanswer = action.payload.correctanswer;
          }
          return state.answers;
        });
      }
    },
    resetQuiz: (state) => {
      state.answers = [];
    },
  },
});

export const { saveAnswer, resetQuiz } = answerSlice.actions;

export default answerSlice.reducer;
