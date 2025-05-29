import { Outlet } from "react-router"
import "./Header.css"


function Header() {
    console.log("header IN") // 제발 확인용
    return (
        <div>
            <header id="header">
                <div id="title">TAPIE Board</div>
                <div id="container">
                    <div id="userName">BaboJunYoung</div> {/*임시*/}
                    <button id="logIOButton"> {/*log In Out*/}
                        <img id="logIOImage" src="logOut.svg"/> {/*임시*/}
                        <text id="logIOText">로그아웃</text>
                    </button>
                </div>
            </header>
            <Outlet/>
        </div>
    )
}

export default Header
/*
 export : 요소를 내보낼 때 사용. (반대로는 import)
 export default : 단일요소를 내보낼 때 주로 사용. ( 명확히 하나만 있음을 보여주기 위해 주로 사용됨 )
 export function Header() {...} 형식도 된다네요
*/