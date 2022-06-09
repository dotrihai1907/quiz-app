import styles from "./QuizSetting.module.scss";
import "antd/dist/antd.css";

import { Typography, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeAmount } from "../../redux/question/reducer";

import { selectMaxQuestions } from "../../redux/question/selector";

function QuizSetting() {
  const { Text, Title, Paragraph } = Typography;

  const dispatch = useDispatch();
  const maxQuestions = useSelector(selectMaxQuestions);
  const navigate = useNavigate();

  const handleQuiz = () => {
    navigate("/questions");
  };

  const handleAmount = (value) => {
    dispatch(changeAmount(value));
  };

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        Puzzle Number Option
      </Title>

      <Text className={styles.text} italic>
        Amount of Questions
      </Text>
      <br />
      <Paragraph italic className={styles.paragraph}>
        More than {maxQuestions} questions
      </Paragraph>
      <br />
      <InputNumber
        size="large"
        className={styles.input}
        autoFocus
        min={1}
        max={maxQuestions}
        onChange={(value) => {
          return handleAmount(value);
        }}
      />

      <div className={styles.loader} onClick={handleQuiz}>
        <div className={styles.outer}></div>
        <div className={styles.middle}></div>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
}

export default QuizSetting;
