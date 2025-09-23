import './SlabSectionData.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SlabSectionData({ heatName }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/slab-section-data/${heatName}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Lỗi gọi API SLAB SECTION DATA:', err));
  }, [heatName]);

  if (!data) return <div className="section">Đang tải dữ liệu SLAB SECTION DATA...</div>;

  return (
    <div className="slab-section">
      <div className="section-title">SLAB SECTION DATA</div>
      <table className="slab-section-data-table">
        <thead>
          <tr>
            <th className="label">Strand</th>
            <th className="label">Slab</th>
            <th className="label">Section Type</th>
            <th className="label">Start Pos [mm]</th>
            <th className="label">Length [mm]</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.STRAND_NUMBER}</td>
              <td>{row.PRODUCT_NAME}</td>
              <td>{row.ENTRY_TYPE}</td>
              <td>{row.START_POSITION}</td>
              <td>{row.SECTION_LENGTH}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SlabSectionData;
