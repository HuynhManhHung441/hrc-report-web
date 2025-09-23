import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SlabData.css";

export default function SlabData({ heatName }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!heatName) return;
    axios
      .get(`http://localhost:5000/api/heat-report/slab-data/${heatName}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Lỗi gọi SLAB DATA:", err));
  }, [heatName]);

  const columns = [
    "Strand",
    "No",
    "Marking No.",
    "Length Act",
    "Length Aim",
    "Length Min",
    "Length Max",
    "Width Front",
    "Width Back",
    "Thick",
    "Weight Calc",
    "Weight Act",
    "Time",
    "Cut Mode",
    "Sample",
    "QE Int",
    "QE Surf",
    "Destination",
  ];

  // Hàm render icon QE
  const renderQEIcon = (value) => {
    if (value === null || value === undefined) return "-";
    return value === "OK" ? (
      <span style={{ color: "green", fontSize: "16px"}}>✔</span>
    ) : (
      <span style={{ color: "red", fontSize: "16px"}}>✖</span>
    );
  };

  const totalWeightCalc = data.reduce((sum, row) => sum + row.WEIGHT_CALCULATED, 0);
  const totalWeightAct = data.reduce((sum, row) => sum + row.WEIGHT_MEASURED, 0);
  const totalLengthAct = data.reduce((sum, row) => sum + row.ACTUAL_LENGTH_COLD, 0);

  return (
    <section className="slab-section">
      <div className="section-title">SLAB DATA</div>
      <div className="table-container">
        <table className="slab-table">
          <thead>
            <tr>
               <th rowSpan="2" className="label">Strand</th>
               <th rowSpan="2" className="label">No</th>
               <th rowSpan="2" className="label">Marking No.</th>
              <th colSpan="4" className="label">Length [mm]</th>
              <th colSpan="2" className="label">Width [mm]</th>
              <th rowSpan="2" className="label">Thick [mm]</th>
              <th colSpan="2" className="label">Weight [t]</th>

              <th colSpan="3" className="label">Cut</th>
              <th colSpan="2" className="label">QE</th>
              <th rowSpan="2" className="label">Destination</th>
            </tr>
            <tr>
              <th className="label">Act</th><th className="label">Aim</th><th className="label">Min</th><th className="label">Max</th>
              <th className="label">Front</th><th className="label">Back</th>
              <th className="label">Calc</th><th className="label">Act</th>
              <th className="label">Time</th><th className="label">Mode</th><th className="label">Sample</th>
              <th className="label">Int</th><th className="label">Surf</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.STRAND_NUMBER}</td>
                <td>{row.PRODUCT_NAME}</td>
                <td>{row.MARKING_NUMBER}</td>
                <td>{row.ACTUAL_LENGTH_COLD}</td>
                <td>{row.LENGTH_AIM}</td>
                <td>{row.LENGTH_MIN}</td>
                <td>{row.LENGTH_MAX}</td>
                <td>{row.WIDTH_FRONT_COLD}</td>
                <td>{row.WIDTH_BACK_COLD}</td>
                <td>{row.THICKNESS_COLD}</td>
                <td>{row.WEIGHT_CALCULATED.toFixed(2)}</td>
                <td>{row.WEIGHT_MEASURED.toFixed(2)}</td>
                <td>{row.CUTTING_TIME}</td>
                <td>{row.CUTTING_MODE}</td>
                <td>{row.SAMPLE_CUT}</td>
                <td>{renderQEIcon(row.QUALITY_RESULT_INTERN)}</td>
                <td>{renderQEIcon(row.QUALITY_RESULT_SURFACE)}</td>
                <td>{row.SLAB_DESTINATION}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="1"></td>
              <td colSpan="1">{data.length}</td>
              <td colSpan="1"></td>
              <td colSpan="1">{totalLengthAct.toFixed(2)}</td>
              <td colSpan="6"></td>
              <td>{totalWeightCalc.toFixed(2)}</td>
              <td>{totalWeightAct.toFixed(2)}</td>
              <td colSpan="6"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
