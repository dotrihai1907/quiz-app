import axios from "axios";

export default axios.create({
  baseURL: "https://fwa-ec-quiz-mock1.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});
