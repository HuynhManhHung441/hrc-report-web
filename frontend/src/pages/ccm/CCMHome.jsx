// src/pages/ccm/CCMHome.jsx
import { Link } from "react-router-dom"

function CCMHome() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to CCM Home</h2>
      <ul>
        <li>
          <Link to="/heat-report">Heat Report</Link>
        </li>
        <li>
          <Link to="/quality-report">Quality Report</Link>
        </li>
        <li>
          <Link to="/shift-report">Shift Report</Link>
        </li>
      </ul>
    </div>
  )
}

export default CCMHome
