import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LadleSection({heatName}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/ladle-section/${heatName}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Lỗi gọi API Ladle Section:', err));
  }, [heatName]);

  if (!data) return <div className="section">Đang tải dữ liệu LADLE...</div>;

  return (
    <div className="section ladle-section">
      <div className="section-title">LADLE</div>
      <div className="data-grid">
        <div className="data-item"><span className="label">Ladle No.</span> <span className="value">{data.LADLE_NAME}</span></div>
        <div className="data-item"><span className="label">Turret Arm</span> <span className="value">{data.TURRET_ARM}</span></div>
      </div>
    </div>
  );
}

export default LadleSection;

