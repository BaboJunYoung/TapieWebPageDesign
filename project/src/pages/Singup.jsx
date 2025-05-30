import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.username === username)) {
      alert("이미 존재하는 유저이름입니다.");
      return;
    }
    users.push({ username, nickname, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("회원가입이 완료되었습니다. 로그인 해주세요!");
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "0 auto" }}>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="유저이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
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
        회원가입
      </button>
    </form>
  );
}

export default Signup;