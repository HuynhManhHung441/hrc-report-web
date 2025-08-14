import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShroudSection({heatName}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/shroud-section/${heatName}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Lỗi gọi API Shroud Section:', err));
  }, [heatName]);

  if (!data) return <div className="section">Đang tải dữ liệu SHROUD...</div>;
  return (
    <div className="section shroud-section">
      <div className="section-title">SHROUD</div>
      <div className="data-grid">
        <div className="data-item"><span className="label">Type</span> <span className="value">{data.SHROUD_TYPE}</span></div>
        <div className="data-item"><span className="label"> Heat Counter</span> <span className="value">{data.SHROUD_HEAT_COUNTER}</span></div>
      </div>
    </div>
  );
}

export default ShroudSection;

