import { createSelector } from "reselect";

// trỏ đến state của reducer answer
const selectAnswer = (state) => state.answer;

// trỏ đến item answers của answerSlice
export const selectAnswers = createSelector(
  [selectAnswer],
  (answerSlice) => answerSlice?.answers
  // answerSlice && answerSlice.answers
);

