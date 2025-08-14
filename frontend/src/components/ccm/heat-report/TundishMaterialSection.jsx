import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TundishMaterialSection({heatName}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/tundish-material-section/${heatName}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Lỗi gọi API Tundish:', err));
  }, [heatName]);

  if (!data) return <div className="section">Đang tải dữ liệu TUNDISH MATERIAL...</div>;

  return (
    <div className="section tundish-section">
      <div className="section-title">TUNDISH MATERIAL</div>
      <div className="data-grid">
        <div className="data-item"><span className="label">Slag Powder</span> <span className="value">{data.TD_SLAG_NAME}</span></div>
        <div className="data-item"><span className="label">Insulation Powder</span> <span className="value">{data.TD_INSUL_NAME}</span></div>
        <div className="data-item"><span className="label">Spray Material</span> <span className="value">{data.TUND_SPRAY_MATERIAL}</span></div>
      </div>
    </div>
  );
}

export default TundishMaterialSection;