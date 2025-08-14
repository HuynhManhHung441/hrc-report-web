import './TundishTempSporadic.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TundishTempSporadic({ heatName }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/tundish-temp-sporadic/${heatName}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Lỗi gọi API TUNDISH TEMP SPORADIC:', err));
  }, [heatName]);

  if (!data) return <div className="section">Đang tải dữ liệu TUNDISH TEMP SPORADIC...</div>;

  return (
    <div className="tundish-temp-sporadic-section">
      <div className="section-title">TUNDISH TEMP (SPORADIC)</div>
      <table className="tundish-temp-table">
        <thead>
          <tr>
            <th className="label">Time</th>
            <th className="label">Temp <br/>[°C]</th>
            <th className="label">S.Heat <br/>[°C]</th>
            <th className="label">Liqu Temp <br/>[°C]</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.MEASUREMENT_TIME}</td>
              <td>{row.MEASUREMENT_TEMPERATURE}</td>
              <td>{row.SUPER_HEAT}</td>
              <td>{row.LIQUIDUS_TEMPERATURE}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TundishTempSporadic;
