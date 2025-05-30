import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./module.css"
// module.css
import styles from "./Signup.module.css"

// 회원가입 컴포넌트 만들기
function Signup() {
  // 입력값을 저장할 상태(state) 만들기
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  // 페이지 이동을 도와주는 함수
  const navigate = useNavigate();

  // 회원가입 폼이 제출(submit)될 때 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 막기
    // localStorage에서 users라는 데이터를 불러옴 (없으면 빈 배열)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // 이미 같은 username이 있으면 회원가입 불가
    if (users.some((u) => u.username === username)) {
      alert("이미 존재하는 유저이름입니다."); // 알림
      return;
    }
    // 새로운 유저를 배열에 추가
    users.push({ username, nickname, password });
    // localStorage에 다시 저장
    localStorage.setItem("users", JSON.stringify(users));
    alert("회원가입이 완료되었습니다. 로그인 해주세요!"); // 성공 메시지
    navigate("/login"); // 로그인 페이지로 이동
  };

  // 화면에 보여줄 폼
  return (
    <form onSubmit={handleSubmit} >

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

export default Signup; // 이 컴포넌트를 다른 파일에서 쓸 수 있게 내보냄