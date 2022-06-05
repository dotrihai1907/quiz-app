import { createSelector } from "reselect";

// trỏ đến state của reducer question
const selectQuestion = (state) => state.question;

// trỏ đến item questions của questionSlice
export const selectQuestions = createSelector(
  [selectQuestion],
  (questionSlice) => questionSlice?.questions
);

// trỏ đến item amount của questionSlice
export const selectAmount = createSelector(
  [selectQuestion],
  (questionSlice) => questionSlice?.amount
);

// trỏ đến item maxQuestions của questionSlice
export const selectMaxQuestions = createSelector(
  [selectQuestion],
  (questionSlice) => questionSlice?.maxQuestions
);
