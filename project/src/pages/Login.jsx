import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      onLogin(user); // App에서 로그인 상태 관리
      navigate("/");
    } else {
      alert("로그인 정보가 올바르지 않습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "0 auto" }}>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="유저이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <button type="submit" style={{ width: "100%" }}>
        로그인
      </button>
      <div style={{ marginTop: 10 }}>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          style={{ width: "100%" }}
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

export default Login;