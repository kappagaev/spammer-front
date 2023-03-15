import { NavLink } from "react-router-dom"

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink end className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink end className="nav-link" to="/targets">
              Targets
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink end className="nav-link" to="/targets/create">
              New Target
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink end className="nav-link" to="/Spam">
              Spam
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
