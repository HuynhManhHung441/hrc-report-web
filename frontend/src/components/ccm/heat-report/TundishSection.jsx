import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TundishSection({heatName}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/tundish/${heatName}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Lỗi gọi API Tundish:', err));
  }, [heatName]);

  if (!data) return <div className="section">Đang tải dữ liệu TUNDISH...</div>;

  return (
    <div className="section tundish-section">
      <div className="section-title">TUNDISH</div>
      <div className="data-grid">
        <div className="data-item"><span className="label">Number</span> <span className="value">{data.TUNDISH_NAME}</span></div>
        <div className="data-item"><span className="label">Car</span> <span className="value">{data.TUNDISH_CAR}</span></div>
        <div className="data-item"><span className="label">Heat Counter</span> <span className="value">{data.HEAT_COUNTER}</span></div>
        <div className="data-item"><span className="label">Weight Ladle Open</span> <span className="value">{data.TUND_WEIGHT_AT_OPEN_TON} t</span></div>
        <div className="data-item"><span className="label">Weight Ladle Close</span> <span className="value">{data.TUND_WEIGHT_AT_CLOSE_TON} t</span></div>
      </div>
    </div>
  );
}

export default TundishSection;