import { useEffect, useState } from "react";
import styles from "./EditPost.module.css"
import { useNavigate, useParams } from "react-router";
import axios from "axios";

function EditPost() {
    const navigate = useNavigate();
    const params = useParams();
    const postId = params.postId;
    const root = "https://community-api.tapie.kr";

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        // postId로 제목 내용 가져오기
        axios.get(root+"/board/posts/"+postId)
        .then(response => {
            response = response.data;
            setTitle(response.title);
            setContent(response.content);
        })

    }, []);

    const edit = () => {
        try{
            axios.put(root+"/board/posts/"+postId, {
                "title": title,
                "content": content
            }, {
                withCredentials: true
            })
            // 성공
            navigate("/");
        } catch(error) {
            switch(error.status) {
                case 401:
                    alert("인증쿠기가 없습니다.")
                    break;
                case 403:
                    alert("작성자만 지울 수 있습니다.");
                    break;
                case 404:
                    alert("게시글을 찾을 수 없습니다.");
                    break;
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
            <div id={styles.writePostText}>글 수정</div>
            <div id={styles.titleContentContainer}>
                <div id={styles.titleContainer}>
                    <div id={styles.titleText}>제목</div>
                    <input id={styles.titleInput}
                        value={title}
                        placeholder="제목을 작성해주세요"
                        onChange={(event)=>setTitle(event.target.value)}
                    />
                </div>
                <div id={styles.contentContainer}>
                    <div id={styles.contentText}>내용</div>
                    <textarea id={styles.contentInput}
                        value={content}
                        placeholder="내용을 작성해주세요"
                        onChange={(event)=>setContent(event.target.value)}
                    />
                </div>
                <button id={styles.postButton}
                    onClick={edit}
                >
                    <img src="/editPencilWhite.svg"/> {/* 이미지들 이름이 넘 복잡하네;; */}
                    <div id={styles.postText}>수정하기</div>
                </button>
            </div>
        </div>
        </>
    )
}

export default EditPost;