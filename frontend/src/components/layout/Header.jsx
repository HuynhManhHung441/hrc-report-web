import { Link, NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">HRC Report</Link>
      </div>
      <nav className="navbar-links">
        <NavLink to="/ccm" className={({ isActive }) => (isActive ? "active" : "")}>CCM</NavLink>
        <NavLink to="/rhf" className={({ isActive }) => (isActive ? "active" : "")}>RHF</NavLink>
        <NavLink to="/hsm" className={({ isActive }) => (isActive ? "active" : "")}>HSM</NavLink>
      </nav>
    </header>
  )
}

export default Header
