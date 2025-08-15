import './RhfHome.css'
import '../../App.css';
import { Link } from "react-router-dom"

function RhfHome() {
  return (
    <div className="container">
      <h2 className="rhf-home-title">PICK TYPE RHF REPORT</h2>
      <ul className="rhf-home-list">
        <li>
          <Link to="/rhf/slab-charged-report">Slab Charged Report</Link>
        </li>
        <li>
          <Link to="/rhf/slab-discharged-report">Slab Discharged Report</Link>
        </li>
      </ul>
    </div>
  )
}

export default RhfHome
