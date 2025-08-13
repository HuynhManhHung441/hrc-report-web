function HeatReport() {
  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1 className="heat-title">HEAT REPORT CCM2-HRC2</h1>
        <img src="/assets/images/LogoGangThepBlue.png" alt="Hòa Phát Logo" className="logo" />
      </div>

      <div className="info-grid">
        <div><span className="label">Heat:</span> <span className="value">{info.HEAT_NAME}</span></div>
        <div><span className="label">Prod. Date:</span> <span className="value">{info.LADLE_OPEN_TIME}</span></div>
        <div><span className="label">Plan:</span> <span className="value">{info.PLAN_NAME}</span></div>
        <div><span className="label">Steel Grade:</span> <span className="value">{info.STEEL_GRADE}</span></div>
        <div><span className="label">Shift:</span> <span className="value">{info.SHIFT_TEAM_NAME}</span></div>
        <div><span className="label">Foreman:</span> <span className="value"></span></div>
      </div>
    </div>  
  )
}

export default HeatReport
