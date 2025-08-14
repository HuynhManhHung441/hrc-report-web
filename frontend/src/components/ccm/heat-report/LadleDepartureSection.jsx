import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LadleDepartureSection({heatName}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/ladle-departure-section/${heatName}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Lỗi gọi API Tundish:', err));
  }, [heatName]);

  if (!data) return <div className="section">Đang tải dữ liệu LADLE DEPARTURE...</div>;

  return (
    <div className="section tundish-section">
      <div className="section-title">LADLE DEPARTURE</div>
      <div className="data-grid">
        <div className="data-item"><span className="label">Time</span> <span className="value">{data.LADLE_DEPART_TIME}</span></div>
        <div className="data-item"><span className="label">Pouring Start/End</span> <span className="value">{data.LADLE_OPEN_TIME} - {data.LADLE_CLOSE_TIME}</span></div>
        <div className="data-item"><span className="label">Pouring Duration</span> <span className="value">{data.POURING_DURATION} min</span></div>
        <div className="data-item"><span className="label">Steel Output Weight</span> <span className="value">{data.LADLE_OUTPUT_WEIGHT} t</span></div>
        <div className="data-item"><span className="label">End Gross Weight</span> <span className="value">{data.LADLE_DEPART_WEIGHT} t</span></div>
      </div>
    </div>
  );
}

export default LadleDepartureSection;