import styles from "./QuizSetting.module.scss";
import "antd/dist/antd.css";

import { Typography, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeAmount } from "../../redux/question/reducer";

import { selectMaxQuestions } from "../../redux/question/selector";

function QuizSetting() {
  const { Text, Title } = Typography;

  const dispatch = useDispatch();
  const maxQuestions = useSelector(selectMaxQuestions);
  console.log(maxQuestions);
  const navigate = useNavigate();

  const handleQuiz = () => {
    navigate("/questions");
  };

  return (
    <div>
      <Title level={2} className={styles.title}>
        Quiz App
      </Title>

      <Text className={styles.text} italic>
        Amount of Questions
      </Text>
      <br />
      <InputNumber
        size="large"
        className={styles.input}
        autoFocus
        min={1}
        max={maxQuestions}
        onChange={(e) => dispatch(changeAmount(e))}
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
