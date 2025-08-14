import './CCMHome.css'
import '../../App.css';
import { Link } from "react-router-dom"

function CCMHome() {
  return (
    <div className="container">
      <h2 className="ccm-home-title">Pick type report</h2>
      <ul className="ccm-home-list">
        <li>
          <Link to="/ccm/heat-report">Heat Report</Link>
        </li>
        <li>
          <Link to="/ccm/quality-report">Quality Report</Link>
        </li>
        <li>
          <Link to="/ccm/shift-report">Shift Report</Link>
        </li>
      </ul>
    </div>
  )
}

export default CCMHome
