import axios from "axios";
import styles from "./Post.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

function Post() {
    const params = useParams();
    const [title, setTitle] = useState("");
    const [userName, setUserName] = useState("");
    const [date, setDate] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        axios.get(`https://community-api.tapie.kr/board/posts/${params.postId}`)
        .then(response => {
            response = response.data;
            let date = response.createdAt;

            setTitle(response.title);
            setUserName(response.author.username);
            setDate(`${date.slice(0, 4)}. ${date.slice(5, 7)}. ${date.slice(8, 10)}`)
            setContent(response.content);
        })
    })
    
    return (
    <>
    <div id={styles.mainContainer}>
        <div id={styles.postContainer}>
            <div id={styles.title}>{title}</div>
            <div id={styles.userDateContainer}>
                <div className={styles.userDate}>{userName}</div>
                <div className={styles.userDate}>·</div>
                <div className={styles.userDate}>{date}</div>
            </div>
            <div id={styles.content}>{content}</div>
        </div>
    </div>
    </>)
    
}

export default Post;