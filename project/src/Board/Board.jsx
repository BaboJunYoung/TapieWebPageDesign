import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./Board.module.css"
import PostItem from "./PostItem.jsx"
import { useNavigate } from "react-router";


function Board({isLogIn}) {
  const [root] = useState("https://community-api.tapie.kr/");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [postType, setPostType] = useState("ALL");

  useEffect(() =>{
    const func = async () => {
      let response;
      postType == "ALL" ?
        response = await axios.get(`${root}board/posts`)
      : response = await axios.get(`${root}board/posts/search?author=@me`, {
        withCredentials: true
      })
      setData(response.data);
      console.log(response.data);
    }
    func();
  }, [postType])

  return (
    <>
    <div id={styles.contentContainer}>
      {/* 따깡 완성 */}
      <div id={styles.header}>
        <button id={styles.writeDownButton} onClick={()=>navigate("/writepost")}>
          <img src="/pencil.svg" id={styles.pencilImage}/>
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
          {data.map((post) => (
              <PostItem 
                key={post.id}
                postId={post.id}
                title={post.title}
                postType={postType}
                userName={post.author.nickname}
                date={post.createdAt}
                content={post.content}
              />
            )
          )}
        </div>
      </div>

    </div>
    </>
  )
}

export default Board
