import { createBrowserRouter, RouterProvider } from "react-router"
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Header from "./Header/Header.jsx"
import "./main.css"

const router = createBrowserRouter([
  {
    path : "/",
    Component : Header,
    children : [
      { index : true, Component: App },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
