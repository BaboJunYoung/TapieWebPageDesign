import { Outlet, useNavigate } from "react-router"
import { useState } from "react"
import styles from "./Header.module.css"
import axios from "axios";


function Header({setIsLogIn, setUserName, isLogIn, userName}) {
    // props: isLogIn, userName
    const navigate = useNavigate();
    const [root] = useState("https://community-api.tapie.kr/");

    const logOut = () => {
        axios.post(`${root}auth/logout`)
        setIsLogIn(false);
        setUserName("");
    }

    console.log("header IN") // 제발 확인용
    return (
        <div id={styles.screenContainer}>
            <header id={styles.header}>
                <div id={styles.title} onClick={
                    () => navigate("/")}>TAPIE Board</div>
                <div id={styles.container}>
                    <div id={styles.userName}>{isLogIn ? userName : null}</div>
                    <button 
                        id={styles.logIOButton} 
                        style={{
                            backgroundColor: isLogIn ? "#FFA4A4" : "#FFFFFF"
                        }}
                        onClick={isLogIn ? logOut : () => navigate("/login")}
                    > {/*log In Out*/}
                        <img id={styles.logIOImage} src={
                            isLogIn ? "/logOutBlack.svg" : "/logInBlack.svg"
                            }/>
                        <div id={styles.logIOText}>{isLogIn ? "로그아웃" : "로그인"}</div>
                    </button>
                </div>
            </header>
            <div id={styles.contentContainer}>
                <Outlet id="outlet"/>
            </div>
        </div>
    )
}

export default Header
/*
 export : 요소를 내보낼 때 사용. (반대로는 import)
 export default : 단일요소를 내보낼 때 주로 사용. ( 명확히 하나만 있음을 보여주기 위해 주로 사용됨 )
 export function Header() {...} 형식도 된다네요
*/