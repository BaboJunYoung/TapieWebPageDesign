import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Signup.module.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://community-api.tapie.kr/auth/register", {
        username,
        nickname,
        password
      });
      alert("회원가입이 완료되었습니다. 로그인 해주세요!");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 422 && err.response?.data?.detail) {
        alert("회원가입 실패: " + err.response.data.detail[0]?.msg);
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.page_container}>
        <div className={styles.container}>
          <p className={styles.signup_text}>회원가입</p>
          <div className={styles.F34}>
            <div className={styles.Input}>
              <div className={styles.Userinput}>
                <p className={styles.username_text}>유저이름</p>
                <input
                  type="text"
                  placeholder="유저이름"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={styles.username}
                />
              </div>
              <div className={styles.Userinput}>
                <p className={styles.Nickname}>닉네임</p>
                <input
                  type="text"
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                  className={styles.nickname}
                />
              </div>
              <div className={styles.Userinput}>
                <p className={styles.password_text}>비밀번호</p>
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.password}
                />
              </div>
              <button className={styles.Button}>
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signup;