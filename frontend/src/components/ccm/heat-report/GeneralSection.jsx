import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GeneralSection({heatName}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/general-section/${heatName}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Lỗi lấy dữ liệu General Section:', err));
  }, [heatName]);

  if (!data) return <div className="section">Đang tải dữ liệu General...</div>;

  return (
    <div className="section general-section">
      <div className="section-title">GENERAL</div>
      <div className="data-grid">
        <div className="data-item"><span className="label">Sequence</span> <span className="value">{data.CAST_NAME}</span></div>
        <div className="data-item"><span className="label">Heat in Sequence</span> <span className="value">{data.HEAT_IN_CAST}</span></div>
        <div className="data-item"><span className="label">Cold Steel Density</span> <span className="value">{data.STEEL_DENSITY_COLD}</span></div>
        <div className="data-item"><span className="label">Yield</span> <span className="value">{data.YIELD}</span></div>
        <div className="data-item"><span className="label">Burn Open</span> <span className="value">{data.BURN_OPEN}</span></div>
        <div className="data-item"><span className="label">Heat Aborted</span> <span className="value">{data.HEAT_ABORTED}</span></div>
      </div>
    </div>
  );
}

export default GeneralSection;
