import { useNavigate } from "react-router"
import styles from "./PostItem.module.css"

function PostItem({title, postId, postType, userName, date, content}) {
    const navigate = useNavigate();
    date = `${date.slice(0, 4)}. ${date.slice(5, 7)}. ${date.slice(8, 10)}`
    
    console.log("POSTITEM IN")
    console.log(postType==="MINE")


    return (
        <>
        <div id={styles.mainContainer} onClick={() => navigate(`/post/${postId}`)}>
            <div id={styles.header}>
                <div id={styles.title}>{title}</div>
                {postType==="MINE" &&
                <div id={styles.titleButtonContainer}>
                    <button id={styles.fixButton} className={styles.titleButton}><img src="edit.svg" className={styles.titleButtonImage}/></button>
                    <button id={styles.deleteButton} className={styles.titleButton}><img src="delete.svg" className={styles.titleButtonImage}/></button>
                </div>
                }
            </div>
            <div id={styles.container}>
                <div className={styles.containerItems}>{userName}</div>
                <div className={styles.containerItems}>·</div>
                <div className={styles.containerItems}>{date}</div>
            </div>
            <div id={styles.content}>{content}</div>
        </div>
        </>
    )
}

export default PostItem;