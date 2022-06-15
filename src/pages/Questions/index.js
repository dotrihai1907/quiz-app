/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Questions.module.scss";
import "antd/dist/antd.css";

import { Typography, Button, Divider, Row, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getQuestion } from "../../redux/question/actions";
import { saveAnswer } from "../../redux/answer/reducer";
import { submitAnswer } from "../../redux/answer/actions";

import { selectRole, selectAccessToken } from "../../redux/auth/selector";
import { selectQuestions, selectAmount } from "../../redux/question/selector";
import { selectAnswers } from "../../redux/answer/selector";

function Questions() {
  const { Title } = Typography;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [isClickNav, setIsClickNav] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questions = useSelector(selectQuestions);
  const role = useSelector(selectRole);
  const accessToken = useSelector(selectAccessToken);
  const amount = useSelector(selectAmount);
  const answers = useSelector(selectAnswers);

  const question = questions[questionIndex];
  const questionId = question?.id;

  useEffect(() => {
    if (accessToken && role === "user") {
      dispatch(getQuestion(accessToken, amount));
    }
  }, [accessToken, amount, role]);

  useEffect(() => {
    if (questions?.length) {
      let answers = [
        question?.answer1,
        question?.answer2,
        question?.answer3,
        question?.answer4,
      ];
      setOptions(answers);
    }
  }, [
    questions,
    questionIndex,
    question?.answer1,
    question?.answer2,
    question?.answer3,
    question?.answer4,
  ]);

  const handleAnswer = (option) => {
    setAnswer(option);
  };

  const handleBack = () => {
    setQuestionIndex((questionIndex) => questionIndex - 1);
  };

  const handleSkip = () => {
    setQuestionIndex((questionIndex) => questionIndex + 1);
  };

  const handleSaveAnswer = () => {
    if (answer === "") {
      Modal.error({
        title: "Note!",
        content: "You have not selected an answer",
      });
    } else {
      console.log(questionId, answer);
      dispatch(saveAnswer({ id: questionId, correctanswer: answer }));
      setAnswer("");
      if (questionIndex + 1 < questions.length) {
        setQuestionIndex((questionIndex) => questionIndex + 1);
      } else {
        setIsClickNav(false);
      }
    }
  };

  const handleSubmitAnswer = () => {
    console.log(answers);
    dispatch(submitAnswer(accessToken, answers, navigate));
  };

  return (
    <div>
      <div className={styles.content}>
        <div className="question">
          <Title level={2}>
            Question {questionIndex + 1}/{questions.length}
          </Title>
          <Title level={4}>{question?.question}</Title>
        </div>

        <div className="answer">
          {options.map((option, index) => (
            <Button
              block
              size="large"
              shape="round"
              className={styles.answer}
              key={index}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <Divider />

      <div className="navigation">
        <Row justify="space-around">
          <Button shape="round" disabled={!questionIndex} onClick={handleBack}>
            Back
          </Button>

          {
            <Button shape="round" onClick={handleSaveAnswer}>
              {questionIndex + 1 < questions.length ? "Save & Next" : "Save"}
            </Button>
          }

          {!(questionIndex + 1 < questions.length) && (
            <Button
              shape="round"
              onClick={handleSubmitAnswer}
              disabled={isClickNav}
            >
              Submit
            </Button>
          )}

          {questionIndex + 1 < questions.length && (
            <Button
              shape="round"
              disabled={questionIndex + 1 < questions.length ? false : true}
              onClick={handleSkip}
            >
              Skip
            </Button>
          )}
        </Row>
      </div>
    </div>
  );
}

export default Questions;
