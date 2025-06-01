import { useNavigate } from "react-router"
import styles from "./PostItem.module.css"
import axios from "axios"

function PostItem({title, postId, postType, userName, date, content}) {
    const navigate = useNavigate();
    const root = "https://community-api.tapie.kr";
    date = `${date.slice(0, 4)}. ${date.slice(5, 7)}. ${date.slice(8, 10)}`
    
    const deletePost = () => {
        axios.delete(root+"/board/posts/"+postId);
    }
    
    return (
        <>
        <div id={styles.mainContainer}>
            <div id={styles.header}>
                <div id={styles.title}>{title}</div>
                {postType==="MINE" &&
                <div id={styles.titleButtonContainer}>
                    <button id={styles.editButton} className={styles.titleButton}
                        onClick={() => navigate(`/editpost/${postId}`)}
                    ><img src="edit.svg" className={styles.titleButtonImage}/></button>
                    <button id={styles.deleteButton} className={styles.titleButton}
                        onClick={()=>deletePost()}
                    ><img src="delete.svg" className={styles.titleButtonImage}/></button>
                </div>
                }
            </div>
            <div id={styles.container}>
                <div className={styles.containerItems}>{userName}</div>
                <div className={styles.containerItems}>·</div>
                <div className={styles.containerItems}>{date}</div>
            </div>
            <div id={styles.content} onClick={() => navigate(`/post/${postId}`)}>{content}</div>
        </div>
        </>
    )
}

export default PostItem;