import { createBrowserRouter, RouterProvider } from "react-router"
import { useState } from "react"
import Board from './Board/Board.jsx'
import Header from "./Header/Header"
import Post from "./Post/Post.jsx"
import LogIn from "./LogIn/LogIn.jsx"
import SignUp from "./SignUp/SignUp.jsx"

function App() {
    const [userName, setUserName] = useState("");
    const [isLogIn ,setIsLogIn] = useState(false);
    
    const router = createBrowserRouter([
      {
        path : "/",
        element : <Header
            userName={userName} isLogIn={isLogIn}
            />,
        children : [
            { index: true, element: <Board isLogIn={isLogIn}/> },
            { path: "post/:postId", element: <Post/>},
            { path: "login", element: <LogIn sendUserName={setUserName} sendIsLogIn={setIsLogIn}/>},
            { path: "signup", element: <SignUp />}
        ]
      }
    ])
    
    return <RouterProvider router = {router}/>
}

export default App;