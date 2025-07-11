import { useEffect, useState } from "react";
import styles from "./LogIn.module.css"
import axios from "axios";
import { useNavigate } from "react-router";

function LogIn({sendUserName, sendIsLogIn}) {
    const [root] = useState("https://community-api.tapie.kr/")
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [errorCode, setErrorCode] = useState("");
    const [color, setColor] = useState("#f00");

    const logIn = async (userName, passWord) => {
        try{
            const response = await axios.post(`${root}auth/login`, {
                "username" : userName,
                "password" : passWord
            }, {
                withCredentials: true
            });
            console.log(response);
            // 로그인 성공함
            navigate("/");
            sendUserName(userName);
            sendIsLogIn(true);
        }catch(error){
            setErrorCode(error.status);
            console.log(error.status);
        }
    }
    
    useEffect( () => {
        const interval = setInterval(() => {
            setColor(prevColor => {
        switch (prevColor) {
          case "#f00": return "#ff0";
          case "#ff0": return "#0f0";
          case "#0f0": return "#0ff";
          case "#0ff": return "#00f";
          case "#00f": return "#f0f"; // 오타 수정: "00f" -> "#00f"
          case "#f0f": return "#f00"; // 오타 수정: "f00" -> "#f00"
          default: return "#f00"; // 예상치 못한 값일 경우 초기값으로 돌아가게
        }
      });
    }, 10);

        // return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div id={styles.mainContainer}>
            <div id={styles.headerContainer}>
                <div id={styles.logInText}>로그인</div>
                <div id={styles.errorMessage}>{errorCode == 401 ? "유저정보가 틀렸습니다." : errorCode == 422 ? "입력해주세요." : errorCode == 500 ? "서버에러" : ""}</div>
            </div>
            <div id={styles.logInContainer}>
                <div id={styles.userNameContainer}>
                    <div id={styles.userNameText}>유저이름</div>
                    <input id={styles.userNameInput}
                        placeholder="유저이름을 입력해주세요"
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div id={styles.passWordContainer}>
                    <div id={styles.passWordText}>비밀번호</div>
                    <input id={styles.passWordInput}
                        placeholder="비밀번호를 입력해주세요"
                        onChange={(event) => setPassWord(event.target.value)}
                        type="password"
                    />
                </div>
                <button id={styles.logInButton} onClick={() => logIn(userName, passWord)}>
                    <img src="/logInWhite.svg"/>
                    <div id={styles.logInButtonText}>로그인</div>
                </button>
            </div>
            <div id={styles.noAccountSignUpContainer}>
                <div id={styles.noAccountSignUpText}>계정이 없으신가요?</div>
                <div id={styles.noAccountSignUpButton}
                onClick={()=>navigate("/signup")}
                style={{backgroundColor: color}}
                >회원가입하기</div>
            </div>
        </div>
        </>
    )
}

export default LogIn;