import { createBrowserRouter, RouterProvider } from "react-router"
import { useState } from "react"
import Board from './Board/Board.jsx'
import Header from "./Header/Header"

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
            // { path: "logIn", element: }
        ]
      }
    ])
    
    return <RouterProvider router = {router}/>
}

export default App;