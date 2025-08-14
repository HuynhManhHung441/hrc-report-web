import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SteelLossSection({heatName}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/steel-loss-section/${heatName}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Lỗi gọi API Shroud Section:', err));
  }, [heatName]);

  if (!data) return <div className="section">Đang tải dữ liệu STEEL LOSS...</div>;
  return (
    <div className="section steel-loss-section">
      <div className="section-title">STEEL LOSS</div>
      <div className="data-grid">
        <div className="data-item"><span className="label">Tundish Skull</span> <span className="value">{data.TUND_SKULL_WEIGHT} t</span></div>
        <div className="data-item"><span className="label">Head Crop</span> <span className="value">{data.HEAD_CROP_WEIGHT_CUTTED} t</span></div>
        <div className="data-item"><span className="label">Tail Crop</span> <span className="value">{data.TAIL_CROP_WEIGHT_CUTTED} t</span></div>
        <div className="data-item"><span className="label">Sample</span> <span className="value">{data.SAMPLE_WEIGHT} t</span></div>
        <div className="data-item"><span className="label">Cut Loss</span> <span className="value">{data.CUT_LOSS_WEIGHT} t</span></div>
        <div className="data-item"><span className="label">Other Loss</span> <span className="value">{data.OTHER_STEEL_LOSS} t</span></div>
      </div>
    </div>
  );
}

export default SteelLossSection;

