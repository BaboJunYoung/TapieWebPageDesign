import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"

// 로그인 컴포넌트 만들기
function Login({ onLogin }) {
  // 입력값을 저장할 상태(state) 만들기
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // 페이지 이동을 도와주는 함수
  const navigate = useNavigate();

  // 로그인 폼이 제출(submit)될 때 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 막기
    // localStorage에서 users라는 데이터를 불러옴 (없으면 빈 배열)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // 입력한 id와 비번이 맞는지 users에서 찾기
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      onLogin(user); // 로그인 성공 시 상위 컴포넌트에 알려줌
      navigate("/"); // 메인(홈)으로 이동
    } else {
      alert("로그인 정보가 올바르지 않습니다."); // 실패 시 알림
    }
  };

  // 화면에 보여줄 폼
  return (
    <form onSubmit={handleSubmit} >
      <div id={styles.page_container}> {/* 화면 전체 공간 */}
        <div className={styles.container}>
          <p id={styles.login_text}>로그인</p>
          <div className={styles.F34}>
            <div className={styles.Input}>
              <div className={styles.Userinput}>
                <p className={styles.username_text}>유저이름</p>
                <input
                type="text" // 텍스트 입력창
                placeholder="유저이름을 입력해주세요"
                value={username} // 입력값
                onChange={(e) => setUsername(e.target.value)} // 입력할 때마다 상태 저장
                required
                className={styles.username}
                />
              </div>
              <div className={styles.Userinput}>
                <p className={styles.password_text}>비밀번호</p>
                <input
                type="password" // 비밀번호 입력창
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
                onClick={() => navigate("/signup")} // 회원가입 버튼 누르면 회원가입 페이지로 이동
              >회원가입</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login; // 이 컴포넌트를 다른 파일에서 쓸 수 있게 내보냄