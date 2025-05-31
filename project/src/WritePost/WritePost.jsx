import { useState } from "react";
import styles from "./WritePost.module.css"
import { useNavigate } from "react-router";
import axios from "axios";

function WritePost() {
    const navigate = useNavigate();
    const root = "https://community-api.tapie.kr/";
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const post = () => {
        try{
            axios.post(`${root}board/posts`, {
                "title": title,
                "content": content
            }, {
                withCredentials: true
            })
            // 성공
            navigate("/");
        } catch(error) {
            switch(error.status) {
                case 422:
                    alert("422에러");
                    break;
                case 500:
                    alert("서버에러!");
                    break;
            }
        }
    }

    return (
        <>
        <div id={styles.mainContainer}>
            <div id={styles.writePostText}>글 작성</div>
            <div id={styles.titleContentContainer}>
                <div id={styles.titleContainer}>
                    <div id={styles.titleText}>제목</div>
                    <input id={styles.titleInput}
                        placeholder="제목을 작성해주세요"
                        onChange={(event)=>setTitle(event.target.value)}
                    />
                </div>
                <div id={styles.contentContainer}>
                    <div id={styles.contentText}>내용</div>
                    <textarea id={styles.contentInput}
                        placeholder="내용을 작성해주세요"
                        onChange={(event)=>setContent(event.target.value)}
                    />
                </div>
                <button id={styles.postButton}
                    onClick={post}
                >
                    <img src="/postWhite.svg"/>
                    <div id={styles.postText}>등록하기</div>
                </button>
            </div>
        </div>
        </>
    )
}

export default WritePost;