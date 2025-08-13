import { Link, NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">HRC Report</Link>
      </div>
      <nav className="navbar-links">
        <NavLink to="/ccm" activeclassname="active">CCM</NavLink>
        <NavLink to="/rhf" activeclassname="active">RHF</NavLink>
        <NavLink to="/hsm" activeclassname="active">HSM</NavLink>
      </nav>
    </header>
  )
}

export default Header
