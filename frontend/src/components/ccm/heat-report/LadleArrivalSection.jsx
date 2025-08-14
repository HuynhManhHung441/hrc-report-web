import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LadleArrivalSection({heatName}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/ladle-arrival/${heatName}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Lỗi gọi API Ladle Arrival:', err));
  }, [heatName]);

  if (!data) return <div className="section">Đang tải dữ liệu LADLE ARRIVAL...</div>;

  return (
    <div className="section ladle-arrival-section">
      <div className="section-title">LADLE ARRIVAL</div>
      <div className="data-grid">
        <div className="data-item"><span className="label">Time</span> <span className="value">{data.LADLE_ARRIVE_TIME}</span></div>
        <div className="data-item"><span className="label">Temperature</span> <span className="value">{data.TEMP_BEFORE_CASTER} &deg;C</span></div>
        <div className="data-item"><span className="label">Start Net Weight</span> <span className="value">{data.STEEL_NET_WEIGHT} t</span></div>
        <div className="data-item"><span className="label">Start Gross Weight</span> <span className="value">{data.LADLE_ARRIVE_WEIGHT} t</span></div>
        <div className="data-item"><span className="label">Ladle Tare Weight</span> <span className="value">{data.LADLE_TARE_WEIGHT} t</span></div>
      </div>
    </div>
  );
}

export default LadleArrivalSection;
