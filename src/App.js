/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import tokenExpried from "./api/tokenExpired";

import { RedirectRole, UserRole, AdminRole } from "./pages/RouteGuard";

import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import GetQuestionsAdmin from "./components/GetQuestionsAdmin";
import CreateQuestion from "./components/CreateQuestion";
import GetUsers from "./components/GetUsers";
import CreateUser from "./components/CreateUser";

import QuizSetting from "./pages/QuizSetting";
import Questions from "./pages/Questions";
import ResultQuiz from "./pages/ResultQuiz";

import Admin from "./pages/Admin";

import NotFound from "./pages/NotFound";

import {
  selectRole,
  selectAccessToken,
  selectRefreshToken,
} from "./redux/auth/selector";

import { refresh } from "./redux/auth/actions";

function App() {
  const role = useSelector(selectRole);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken && refreshToken) {
      tokenExpried(accessToken, () => {
        dispatch(refresh(refreshToken));
      });
    }
  }, [accessToken, refreshToken]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              element={<RedirectRole accessToken={accessToken} role={role} />}
            >
              <Route index element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<UserRole accessToken={accessToken} role={role} />}>
              <Route path="/quizsetting" element={<QuizSetting />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/resultquiz" element={<ResultQuiz />} />
            </Route>

            <Route
              element={<AdminRole accessToken={accessToken} role={role} />}
            >
              <Route path="/admin" element={<Admin />}>
                <Route path="/admin/getusers" element={<GetUsers />} />
                <Route path="/admin/createuser" element={<CreateUser />} />

                <Route
                  path="/admin/getquestionsadmin"
                  element={<GetQuestionsAdmin />}
                />
                <Route
                  path="/admin/createquestion"
                  element={<CreateQuestion />}
                />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
