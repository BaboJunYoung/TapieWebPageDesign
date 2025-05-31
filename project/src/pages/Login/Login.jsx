import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 서버에 로그인 요청 (문서 기준 username/password만 전송)
      const res = await axios.post("https://community-api.tapie.kr/auth/login", {
        username,
        password
      });

      // 서버 응답 구조 콘솔로 확인
      console.log("로그인 응답:", res.data);

      // 예시: 서버가 access_token을 반환하면 저장
      if (res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
      }

      // onLogin 콜백이 있으면 user 정보, 토큰 넘김 (구조에 맞게 수정)
      if (onLogin) {
        onLogin(res.data); // 필요에 따라 res.data.user, res.data.access_token 등으로 분리
      }

      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else if (err.response?.status === 422) {
        alert("입력값을 다시 확인해주세요.");
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
      // 상세 에러 로그
      console.log("로그인 에러:", err.response || err);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <div id={styles.page_container}>
        <div className={styles.container}>
          <p id={styles.login_text}>로그인</p>
          <div className={styles.F34}>
            <div className={styles.Input}>
              <div className={styles.Userinput}>
                <p className={styles.username_text}>유저이름</p>
                <input
                  type="text"
                  placeholder="유저이름을 입력해주세요"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={styles.username}
                />
              </div>
              <div className={styles.Userinput}>
                <p className={styles.password_text}>비밀번호</p>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.password}
                />
              </div>
            </div>
            <div className={styles.Button}>
              <button type="submit">로그인</button>
              <button
                type="button"
                onClick={() => navigate("/signup")}
              >회원가입</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;