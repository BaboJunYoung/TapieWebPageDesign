import styles from "./PostItem.module.css"

function PostItem({title, userName, date, content}) {
    date = `${date.slice(0, 4)}. ${date.slice(5, 7)}. ${date.slice(8, 10)}`
    return (
        <>
        <div id={styles.mainContainer}>
            <div id={styles.title}>{title}</div>
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