import { createBrowserRouter, RouterProvider } from "react-router"
import { useState } from "react"
import Board from './Board/Board.jsx'
import Header from "./Header/Header"
import Login from "./pages/Login";
import Signup from "./pages/Singup";

function App() {
    const [userName, setUserName] = useState("");
    const [isLogIn ,setIsLogIn] = useState(false);

    // 로그인 성공 시 콜백
    const handleLogin = (user) => {
        setUserName(user.nickname);
        setIsLogIn(true);
    };

    const handleLogout = () => {
        setUserName("");
        setIsLogIn(false);
    };

    const router = createBrowserRouter([
      {
        path : "/",
        element : <Header userName={userName} isLogIn={isLogIn} onLogout={handleLogout} />,
        children : [
            { index: true, element: <Board isLogIn={isLogIn}/> },
            { path: "login", element: <Login onLogin={handleLogin}/> },
            { path: "signup", element: <Signup /> },
        ]
      }
    ]);
    
    return <RouterProvider router={router}/>;
}

export default App;