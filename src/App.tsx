import { Outlet } from "react-router-dom"
import { NavBar } from "./components/layout/NavBar"
import { NotificationBar } from "./components/UI/NotificationBar"

function App() {
  return (
    <div className="App">
      <NavBar />
      <NotificationBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default App
