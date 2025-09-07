import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HeatReport.css';

import HeatReportHeader from '../../components/ccm/heat-report/HeatReportHeader';
import GeneralSection from '../../components/ccm/heat-report/GeneralSection';
import LadleSection from '../../components/ccm/heat-report/LadleSection';
import LadleArrivalSection from '../../components/ccm/heat-report/LadleArrivalSection';
import TundishSection from '../../components/ccm/heat-report/TundishSection';
import ShroudSection from '../../components/ccm/heat-report/ShroudSection';
import SteelLossSection from '../../components/ccm/heat-report/SteelLossSection';
import OperatorCommentSection from '../../components/ccm/heat-report/OperatorCommentSection';
import LadleDepartureSection from '../../components/ccm/heat-report/LadleDepartureSection';
import TundishMaterialSection from '../../components/ccm/heat-report/TundishMaterialSection';
import TundishTempSporadic from '../../components/ccm/heat-report/TundishTempSporadic';
import TundishTempContinuous from '../../components/ccm/heat-report/TundishTempContinuous';
import StrandDataSection from '../../components/ccm/heat-report/StrandDataSection';
import AnalysisDataSection from '../../components/ccm/heat-report/AnalysisDataSection';

function HeatReport() {
  const [info, setInfo] = useState(null);
  const [heatName, setHeatName] = useState('25F003353');
  const [heatNameInput, setHeatNameInput] = useState();
  useEffect(() => {
    // Gọi API lấy dữ liệu phần Header
    axios.get(`http://localhost:5000/api/heat-report/general-info/${heatName}`)
      .then(res => setInfo(res.data))
      .catch(err => console.error('❌ Lỗi gọi API:', err));
  }, [heatName]);

  const handleSearch = () => {
    if (!heatNameInput.trim()) return; // nếu input rỗng thì không làm gì
    setHeatName(heatNameInput.trim()); // load dữ liệu mới
    setHeatNameInput(""); // reset lại input về rỗng
  };

  if (!info) return <div>Đang tải dữ liệu...</div>;
  return (
    <div className="container">
      {/* Header */}
      <div id="heat-report__content">
        <HeatReportHeader heatName={heatName} />
        <div className="section-row">
          {/* Cột 1: General + Operator Comment */}
          <div className="column">
            <GeneralSection heatName={heatName} />
            <OperatorCommentSection />
            <TundishTempSporadic heatName={heatName} />
          </div>

          {/* Cột 2: Ladle + Shroud + Steel Loss */}
          <div className="column">
            <LadleSection heatName={heatName} />
            <ShroudSection heatName={heatName} />
            <SteelLossSection heatName={heatName} />
            <TundishTempContinuous />
          </div>

          {/* Cột 3: Ladle Arrival */}
          <div className="column">
            <LadleArrivalSection heatName={heatName} />
            <LadleDepartureSection heatName={heatName} />
          </div>

          {/* Cột 4: Tundish */}
          <div className="column">
            <TundishSection heatName={heatName} />
            <TundishMaterialSection heatName={heatName} />
          </div>
        </div>
        <StrandDataSection heatName={heatName} />
        <AnalysisDataSection heatName={heatName} />
      </div>

      <div className="heat-report__search">
        <input
            type="text"
            placeholder="🔍Heat Name"
            value={heatNameInput}
            onChange={(e) => setHeatNameInput(e.target.value)}
          />
        <button onClick={handleSearch}>Search</button>
      </div>

    </div>
  );
}

export default HeatReport;
