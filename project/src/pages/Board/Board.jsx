import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./Board.module.css"
import PostItem from "./PostItem/PostItem.jsx"
import { useNavigate } from "react-router-dom"


function Board({isLogIn}) {
  const [root] = useState("https://community-api.tapie.kr/")
  const [data, setData] = useState([]);
  const [postType, setPostType] = useState("ALL");

  const navigate = useNavigate();

  const handleWrite = () => {
    // if(로그인 됨)
      navigate("/write");
  }

  useEffect(() =>{
    const func = async () => {
      const response = await axios.get(root+"board/posts");
      setData(response.data);
      console.log(response.data);
    }
    func();
  }, [])

  return (
    <>
    <div id={styles.contentContainer}>
      {/* 따깡 완성 */}
      <div id={styles.header}>
        <button id={styles.writeDownButton} 
          onClick={isLogIn ? handleWrite : undefined}
          style={{
            opacity: isLogIn ? 1 : 0.3,
            pointerEvents: isLogIn ? "auto" : "none"
          }}>

          <img src="pencil.svg" id={styles.pencilImage}/>
          <div id={styles.writeDownText}>글 작성하기</div>
        </button>
        
        <div id={styles.totalPostText}>
          {postType == "ALL" ? "전체" : "나의"} 글 {data.length}개 작성됨.
        </div>
      </div>

      {/* 발 */}
      <div id={styles.footer}>

        {isLogIn &&
        <div id={styles.postTypeContainer}>
          <button 
            className={styles.postTypeButton}
            style={{backgroundColor: postType === "ALL" ? "#565656" : "black"}}
            onClick={() => setPostType("ALL")}
            >전체</button>
          <button
            className={styles.postTypeButton}
            style={{backgroundColor: postType === "MINE" ? "#565656" : "black"}}
            onClick={() => setPostType("MINE")}
            >나의 글</button>
        </div>}

        {/* 게시물 올라오는 곳 */}
        <div id={styles.postContainer}>
          {/* 게시물 */}
          {data.map((post) => 
            <PostItem 
              key={post.id}
              title={post.title}
              postType={postType}
              userName={post.author.username}
              date={post.createdAt}
              content={post.content}
            />
          )}
        </div>
      </div>

    </div>
    </>
  )
}

export default Board