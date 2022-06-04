import styles from "./Questions.module.scss";
import "antd/dist/antd.css";

import { Typography, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { getQuestion } from "../../redux/question/actions";

import { selectRole, selectAccessToken } from "../../redux/auth/selector";
import { selectQuestions, selectAmount } from "../../redux/question/selector";

function Questions() {
  const { Title } = Typography;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();

  const questions = useSelector(selectQuestions);
  const role = useSelector(selectRole);
  const accessToken = useSelector(selectAccessToken);
  const amount = useSelector(selectAmount);

  useEffect(() => {
    if (accessToken && role === "user") {
      dispatch(getQuestion(accessToken, amount));
    }
  }, [accessToken]);

  useEffect(() => {
    if (questions?.length) {
      let answers = [
        question.answer1,
        question.answer2,
        question.answer3,
        question.answer4,
      ];
      setOptions(answers);
    }
  }, [questions, questionIndex]);

  const handleClickAnswer = () => {
    setQuestionIndex(questionIndex + 1);
  };

  return (
    <div>
      <div className="question">
        <Title level={2}>
          Question {questionIndex + 1}/{questions.length}
        </Title>
        <Title level={4}>{questions[questionIndex].question}</Title>
      </div>

      <div className="answer">
      {options.map((option, index) => (
        <Button
          block
          size="large"
          shape="round"
          className={styles.answer}
          key={index}
          onClick={handleClickAnswer}
        >
          {option}
        </Button>
      ))}
      </div>

      <Divider />

      <div className="function-keys">
        <Row justify="space-around">
          <Button shape="round" disabled={!questionIndex} onClick={handleBack}>
            Back
          </Button>

          <Button shape="round" onClick={handleSaveandSubmitAnswer}>
            {questionIndex + 1 < questions.length ? "Save & Next" : "Submit"}
          </Button>

          <Button
            shape="round"
            disabled={questionIndex + 1 < questions.length ? false : true}
            onClick={handleSkip}
          >
            Skip
          </Button>
        </Row>
      </div>
    </div>
  );
}

export default Questions;
