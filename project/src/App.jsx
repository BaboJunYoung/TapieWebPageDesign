import { createBrowserRouter, RouterProvider } from "react-router"
import { useState } from "react"
import Board from './pages/Board/Board.jsx'
import Header from "./Header/Header.jsx"
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import WritePage from "./pages/Write/write.jsx";


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
            { path: "write", element: <WritePage userName={userName} onLogout={handleLogout} /> },
            
        ]
      }
    ]);
    
    return <RouterProvider router={router}/>;
}

export default App;