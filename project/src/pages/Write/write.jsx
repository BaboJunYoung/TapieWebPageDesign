import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Write.module.css"

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // 주어진 토큰을 직접 변수로 사용
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwiZXhwIjoxNzQ4NTU5MzM4fQ.ixBHLtTycIGq0RtYcHpEpMPi2LsWuacW-I9guVPq4bU";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://community-api.tapie.kr/board/posts",
        { 
          "title": {title},
          "content": {content},
        },
        {
          // headers: {Authorization: `Bearer ${TOKEN}`}
        }
      );
      alert("게시글 등록 성공!");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("---------");
        console.log(err.response)
        console.log(err.response.status)
        alert("로그인이 필요합니다. (401)");
        navigate("/login");
      } else {
        alert("오류: " + (err.response?.data?.detail || "알 수 없는 오류"));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className={styles.page_container}>
            <div className={styles.container}>
            <p className={styles.writeText}>글 작성</p>
            <div className={styles.InputContainer}>
                <div className={styles.writeContainer}>
                    <p className={styles.write_text}>제목</p>
                    <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="제목을 입력해주세요"
                    className={styles.titlewrite}
                    />
                </div>
                <div className={styles.writeContainer}>
                    <p className={styles.write_text}>내용</p>
                    <input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="내용을 입력해주세요"
                    className={styles.contentwrite}
                    />
                </div>
            <button type="submit">등록하기</button>
            </div>
        
        </div>
        

    </div>
      
    </form>
  );
}

export default Write;