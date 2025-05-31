import { createBrowserRouter, RouterProvider } from "react-router";
import { useState, useEffect } from "react";
import Board from './pages/Board/Board.jsx';
import Header from "./Header/Header.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import WritePage from "./pages/Write/write.jsx";

function App() {
    const [userName, setUserName] = useState("");
    const [isLogIn, setIsLogIn] = useState(false);

    // 로그인 성공 시 콜백
    const handleLogin = (user, token) => { // token 추가 // 변경됨
        setUserName(user.nickname || user.username);
        setIsLogIn(true);
        localStorage.setItem("access_token", token); // 로그인 시 진짜 토큰 저장 // 변경됨
    };

    const handleLogout = () => {
        setUserName("");
        setIsLogIn(false);
        localStorage.removeItem("access_token"); // 로그아웃 시 토큰 삭제 // 변경됨
    };

    // 새로고침 후에도 로그인 상태 유지 (access_token으로 확인)
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            // 실제로는 토큰을 decode해서 username/nickname을 복구해야 하지만,
            // 간단하게 토큰이 있으면 로그인 상태로 처리 // 변경됨
            setIsLogIn(true);
        }
    }, []);

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Header userName={userName} isLogIn={isLogIn} onLogout={handleLogout} />,
        children: [
            { index: true, element: <Board isLogIn={isLogIn}/> },
            { path: "login", element: <Login onLogin={handleLogin}/> }, // 변경됨 (콜백 인자)
            { path: "signup", element: <Signup /> },
            { path: "write", element: <WritePage userName={userName} onLogout={handleLogout} /> },
        ]
      }
    ]);
    
    return <RouterProvider router={router}/>;
}

export default App;