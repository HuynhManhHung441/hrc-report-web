import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HeatReportHeader.css';

function HeatReportHeader({heatName}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/general-info/${heatName}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Get data Heat Report Header Error:', err));
  }, [heatName]);

  if (!data) return <div className="section">Getting data Heat Report Header...</div>;

  return (
    <div className="heat-report-header">
        <div className="header">
            <h1 className="heat-title">HEAT REPORT CCM2-HRC2</h1>
            {/* <img src="/assets/images/LogoGangThepBlue.png" alt="Hòa Phát Logo" className="logo" /> */}
        </div>
        <div className="info-grid">
            <div><span className="label">Heat:</span> <span className="value">{data.HEAT_NAME}</span></div>
            <div><span className="label">Prod. Date:</span> <span className="value">{data.LADLE_OPEN_TIME}</span></div>
            <div><span className="label">Plan:</span> <span className="value">{data.PLAN_NAME}</span></div>
            <div><span className="label">Steel Grade:</span> <span className="value">{data.STEEL_GRADE}</span></div>
            <div><span className="label">Shift:</span> <span className="value">{data.SHIFT_TEAM_NAME}</span></div>
            <div><span className="label">Foreman:</span> <span className="value"></span></div>
        </div>
    </div>
  );
}

export default HeatReportHeader;
