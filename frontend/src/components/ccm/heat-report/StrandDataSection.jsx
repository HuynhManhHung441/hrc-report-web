import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StrandDataSection.css';
function StrandData({ heatName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/strand-data-section/${heatName}`)
      .then(res => {
        console.log('✅ RESPONSE DATA:', res.data);
        setData(res.data)})   
      .catch(err => console.error('Lỗi gọi STRAND DATA:', err));
  }, [heatName]);
  
  return (
    <div className="strand-data-section">
      <div className="section-title">STRAND DATA</div>
      <table className="strand-data-table">
        <colgroup>
          <col className="col-strand" />
          <col className="col-mold" />
          <col className="col-format" />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th rowSpan="2" className="label">Strand</th>
            <th rowSpan="2" className="label">Mold</th>
            <th rowSpan="2" className="label">Format [mm]</th>
            <th colSpan="2" className="label">Powder</th>
            <th colSpan="2" className="label">SEN</th>
            <th colSpan="2" className="label">Strand Length [m]</th>
            <th colSpan="4" className="label">Cast</th>
          </tr>
          <tr>
            <th className="label">Type</th>
            <th className="label">Amount [kg]</th>
            <th className="label">Type</th>
            <th className="label">Counter</th>
            <th className="label">Start</th>
            <th className="label">End</th>
            <th className="label">Start</th>
            <th className="label">End</th>
            <th className="label">Dur. [min]</th>
            <th className="label">Avg speed [m/min]</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
              <tr key={index}>
                <td>{row.STRAND_NAME}</td>
                <td>{row.MOLD_NAME}</td>
                <td>{row.FORMAT}</td>
                <td>{row.CASTING_POWDER_NAME}</td>
                <td>{row.CASTING_POWDER_AMOUNT}</td>
                <td>{row.SEN_TYPE}</td>
                <td>{row.SEN_HEAT_COUNTER}</td>
                <td>{row.MOLD_START_LENGTH}</td>
                <td>{row.MOLD_END_LENGTH}</td>
                <td>{row.MOLD_START_TIME}</td>
                <td>{row.MOLD_END_TIME}</td>
                <td>{row.DURATION}</td>
                <td>{row.AVG_SPEED}</td>
              </tr>
          ))}
        </tbody>
      </table>

      <table className="strand-data-table">
        <colgroup>
          <col className="col-strand" />
          <col className="col-mold" />
          <col className="col-format" />
          <col className="col-practice"/>
          <col className="col-practice"/>
          <col className="col-practice"/>
          <col className="col-practice"/>
        </colgroup>

        <thead>
          <tr>
            <th rowSpan="2" className="label">Strand</th>
            <th rowSpan="2" className="label">Mold</th>
            <th rowSpan="2" className="label">Format [mm]</th>
            <th colSpan="4" className="label">Practices</th>
          </tr>
          <tr>
            <th className="label">Cooling</th>
            <th className="label">Osci</th>
            <th className="label">Gap</th>
            <th className="label">Mold Level Control</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
              <tr>
                <td>{row.STRAND_NAME}</td>
                <td>{row.MOLD_NAME}</td>
                <td>{row.FORMAT}</td>
                <td>{row.L2_COOLING_PRACTICE}</td>
                <td>{row.OSCI_PRACTICE}</td>
                <td>{row.DYNAGAP_PRACTICE}</td>
                <td>{row.MLC_PRACTICE}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StrandData;
