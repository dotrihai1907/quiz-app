import styles from "./Resultquiz.module.scss";
import "antd/dist/antd.css";

import { Typography, Progress, Button, Row } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectScore } from "../../redux/auth/selector";
import { selectAmount } from "../../redux/question/selector";

import { resetQuiz } from "../../redux/answer/reducer";

function ResultQuiz() {
  const { Title, Text } = Typography;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalTrue = useSelector(selectScore);
  const totalAmount = useSelector(selectAmount);
  const score = Math.round((totalTrue * 100) / totalAmount);

  const handleQuit = () => {
    dispatch(resetQuiz());
    navigate("/quizsetting");
  };

  const handleRetry = () => {
    dispatch(resetQuiz());
    navigate("/questions");
  };

  return (
    <div>
      <div className={styles.title}>
        <Title level={2}>Your result</Title>
        <Text strong style={{ fontSize: 24 }}>
          {totalTrue}/{totalAmount}
        </Text>
      </div>

      <Progress
        type="circle"
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        percent={score}
      />

      <div className={styles.text}>
        {score > 99 && (
          <Text italic>You are so cool. You got a perfect score!</Text>
        )}
        {score <= 99 && score > 70 && (
          <Text italic>Well done. That's a good score</Text>
        )}
        {score <= 70 && <Text italic>Oh no. You need to try harder ...</Text>}
      </div>

      <Row justify="space-evenly">
        <Button
          block
          size="large"
          shape="round"
          className={styles.nav}
          onClick={handleQuit}
        >
          Quit
        </Button>
        <Button
          block
          size="large"
          shape="round"
          className={styles.nav}
          onClick={handleRetry}
        >
          Retry
        </Button>
      </Row>
    </div>
  );
}

export default ResultQuiz;
