import { useState } from "react";
import styles from "./SignUp.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

function SignUp() {
    const navigate = useNavigate();
    const [root] = useState("https://community-api.tapie.kr/");
    const [userName, setUserName] = useState("");
    const [nickName, setNickName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [errorCode, setErrorCode] = useState("");
    
    const signUp = async (userName, nickName, passWord) => {
        try {
            await axios.post(`${root}auth/register`, {
                "nickname": nickName,
                "password": passWord,
                "username": userName
            })
            
            // 회원가입 완료
            alert("회원가입 완료! 로그인 해주세염 ㄷㅅㄷ");
            navigate("/login");
        } catch(error) {
            setErrorCode(error.status);
        }
    }

    return (
        <>
        <div id={styles.mainContainer}>
            <div id={styles.headerContainer}>
                <div id={styles.signUpText}>회원가입</div>
                <div id={styles.errorMessage}>{errorCode == 400 ? "중복되었습니다." : errorCode == 401 ? "쿠키가 없습니다." : errorCode == 422 ? "입력해주세요." : errorCode == 500 ? "서버에러" : ""}</div>
            </div>
            <div id={styles.signUpContainer}>
                <div id={styles.userNameContainer}>
                    <div id={styles.userNameText}>유저이름</div>
                    <input id={styles.userNameInput}
                        placeholder="유저이름을 입력해주세요"
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div id={styles.nickNameContainer}>
                    <div id={styles.nickNameText}>닉네임</div>
                    <input id={styles.nickNameInput}
                        placeholder="닉네임을 입력해주세요"
                        onChange={(event) => setNickName(event.target.value)}
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
                <button id={styles.signUpButton} onClick={() => signUp(userName, nickName, passWord)}>
                    <img src="/logInWhite.svg"/>
                    <div id={styles.signUpButtonText}></div>
                </button>
            </div>
        </div>
        </>
    )
}

export default SignUp;