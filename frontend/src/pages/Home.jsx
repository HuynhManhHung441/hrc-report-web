import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to HRC Report System</h2>

      <div className="card">
        <h3>CCM</h3>
        <ul>
          <li><Link to="/ccm/heat-report">Heat Report</Link></li>
          <li><Link to="/ccm/shift-report">Shift Report</Link></li>
          <li><Link to="/ccm/quality-report">Quality Report</Link></li>
        </ul>
      </div>

      <div className="card">
        <h3>RHF</h3>
        <ul>
          <li><Link to="/rhf/slab-discharged-report">Slab Discharged</Link></li>
        </ul>
      </div>

      <div className="card">
        <h3>HSM</h3>
        <ul>
          <li><Link to="/hsm/production-coil-report">Production Coil</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
