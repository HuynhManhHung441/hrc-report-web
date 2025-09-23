import React, { useEffect, useState } from 'react';
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
import SlabData from '../../components/ccm/heat-report/SlabData';
import SlabSectionData from '../../components/ccm/heat-report/SlabSectionData';

function HeatReport() {
  const [heatName, setHeatName] = useState('25F003353');
  const [heatNameInput, setHeatNameInput] = useState();

  const handleSearch = () => {
    if (!heatNameInput.trim()) return; 
    setHeatName(heatNameInput.trim());
    setHeatNameInput("");
  };

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
        <SlabData heatName={heatName} />
        <SlabSectionData heatName={heatName} />
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
