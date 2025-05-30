import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Write() {
  // 제목과 내용을 저장하는 상태 변수
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // 등록 중 로딩 상태를 관리하는 변수
  const [loading, setLoading] = useState(false);
  // 페이지 이동을 위한 네비게이터
  const navigate = useNavigate();

  // 폼 제출 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 동작(새로고침) 방지
    // 제목과 내용이 비어있으면 경고 후 반환
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }
    setLoading(true); // 등록 중에는 버튼 비활성화
    try {
      // 게시글 등록 API 요청
      const response = await axios.post("https://community-api.tapie.kr/board/posts", {
        title,
        content
      });
      // 등록 성공 시 알림
      alert("게시글이 등록되었습니다!");
      // 입력값 초기화
      setTitle("");
      setContent("");
      // 글 목록 페이지로 이동(필요시 경로 수정)
      navigate("/");
    } catch (err) {
      // 서버가 에러 메시지를 보내준 경우
      if (err.response && err.response.data && err.response.data.detail) {
        alert("오류: " + (err.response.data.detail[0]?.msg || "게시글 등록 실패"));
      } else {
        // 그 외 에러
        alert("게시글 등록 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false); // 로딩 해제
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>제목</div>
        {/* 제목 입력 input */}
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          disabled={loading}
        />
      </div>
      <div>
        <div>내용</div>
        {/* 내용 입력 input */}
        <input
          type="text"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          disabled={loading}
        />
      </div>
      {/* 등록 버튼 */}
      <button type="submit" disabled={loading}>
        {loading ? "등록 중..." : "등록하기"}
      </button>
    </form>
  );
}

export default Write;