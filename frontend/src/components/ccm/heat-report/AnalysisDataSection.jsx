import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AnalysisDataSection.css';

function formatValue(val) {
  if (val === null || val === undefined || val === '') return '';
  if (typeof val === 'number') {
    return Number(val).toFixed(4);
  }
  return val;
}


export default function AnalysisDataSection({ heatName }) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const [minValues, setMinValues] = useState({});
  const [maxValues, setMaxValues] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/heat-report/analysis-data-section/${heatName}`)
      .then(res => {
        setData(res.data);
        if (res.data && res.data.length > 0) {
          const keys = Object.keys(res.data[0]).filter(k => k !== 'HEAT_NAME');
          setColumns(keys);

        const minRow = res.data.find(row => row.Sample === 'MIN');
        const maxRow = res.data.find(row => row.Sample === 'MAX');

        const minObj = {};
        const maxObj = {};

        if (minRow) {
          keys.forEach(k => {
            const val = parseFloat(minRow[k]);
            if (!isNaN(val)) minObj[k] = val;
          });
        }

        if (maxRow) {
          keys.forEach(k => {
            const val = parseFloat(maxRow[k]);
            if (!isNaN(val)) maxObj[k] = val;
          });
        }

        setMinValues(minObj);
        setMaxValues(maxObj);
        
        }
      })
      .catch(err => console.error('Lỗi gọi ANALYSIS DATA:', err));
  }, [heatName]);

  const isOutOfRange = (col, value) => {
    const numVal = parseFloat(value);
    if (isNaN(numVal)) return false;

    const min = minValues[col];
    const max = maxValues[col];

    if (min !== undefined && numVal < min) return true;
    if (max !== undefined && numVal > max) return true;
    return false;
  };

  return (
    <div className="analysis-section">
      <div className="section-title">
        ANALYSIS DATA
      </div>
      <div className="table-scroll">
        <table className="analysis-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th className="label" key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {columns.map(col => (
                  <td key={col} className = {isOutOfRange(col, row[col]) ? 'out-of-range' : ''}>
                    {col.toLowerCase() === 'peri'
                      ? (
                        <input
                          type="checkbox"
                          checked={!!row[col]}
                          readOnly
                          style={{ pointerEvents: 'none', accentColor: '#e8e5e5ff' }}
                        />
                      )
                      : formatValue(row[col])
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}