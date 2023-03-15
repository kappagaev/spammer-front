import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { NotificationContextProvider } from "./context/NotificationContextProvider"
import "./index.css"
import { router } from "./router"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NotificationContextProvider>
      <RouterProvider router={router} />
    </NotificationContextProvider>
  </React.StrictMode>
)
