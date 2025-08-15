import './HsmHome.css'
import '../../App.css';
import { Link } from "react-router-dom"

function HsmHome() {
  return (
    <div className="container">
      <h2 className="hsm-home-title">PICK TYPE HSM REPORT</h2>
      <ul className="hsm-home-list">
        <li>
          <Link to="/hsm/coil-rejected-report">Coil Rejected Report</Link>
        </li>
        <li>
          <Link to="/hsm/production-coil-report">Production Coil Report</Link>
        </li>
      </ul>
    </div>
  )
}

export default HsmHome
