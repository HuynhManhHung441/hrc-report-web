const fs = require('fs');
const path = require('path');
const connectCcm2Db = require('../config/SqlServer');
const connectCcmMySQL = require('../config/mysql');

const getGeneralInfo = async (req, res) => {
  const { heatName } = req.params;  // Lấy heatName từ URL khi gọi API
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT TOP 1 
        HEAT_NAME,
        FORMAT (LADLE_OPEN_TIME,'dd/MM/yyyy HH:mm') AS LADLE_OPEN_TIME,
        PLAN_NAME,
        STEEL_GRADE,
        SHIFT_TEAM_NAME
      FROM [CC2PRD].[CCM].[V_REP_HEAT]
      WHERE HEAT_NAME = '${heatName}'
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('❌ Lỗi truy vấn dữ liệu:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu tổng quan');
  }
};

const getGeneralSectionInfo = async (req, res) => {
  const { heatName } = req.params;  // Lấy heatName từ URL khi gọi API
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT TOP(1) 
        CAST_NAME, HEAT_IN_CAST, STEEL_DENSITY_COLD,
        YIELD, BURN_OPEN, HEAT_ABORTED
      FROM [CC2PRD].[CCM].[V_REP_HEAT]
      WHERE HEAT_NAME = '${heatName}'
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('❌ Lỗi truy vấn General Section:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần General');
  }
};

// Phần LADLE Section
const getLadleSectionInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT TOP 1 
        LADLE_NAME, TURRET_ARM
      FROM [CC2PRD].[CCM].[V_REP_HEAT]
      WHERE HEAT_NAME = '${heatName}'
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Ladle Section:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Ladle');
  }
};

// Phần LADLE ARRIVAL Section
const getLadleArrivalInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT TOP(1)
        FORMAT(LADLE_ARRIVE_TIME, 'HH:mm') AS LADLE_ARRIVE_TIME, 
        (TEMP_BEFORE_CASTER - 273.15) AS TEMP_BEFORE_CASTER,
        (STEEL_NET_WEIGHT / 1000) AS STEEL_NET_WEIGHT,
        (LADLE_ARRIVE_WEIGHT /1000) AS LADLE_ARRIVE_WEIGHT,
        (LADLE_TARE_WEIGHT / 1000) AS LADLE_TARE_WEIGHT
      FROM [CC2PRD].[CCM].[V_REP_HEAT]
      WHERE HEAT_NAME = '${heatName}'
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Ladle Arrival:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Ladle Arrival');
  }
};
const getTundishInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT
          h.HEAT_NAME,
          rht.HEAT_COUNTER,
          t.TUNDISH_NAME,
          t.TUNDISH_CAR,
          ROUND(h.TUND_WEIGHT_AT_OPEN / 1000.0, 1) AS TUND_WEIGHT_AT_OPEN_TON,
          ROUND(h.TUND_WEIGHT_AT_CLOSE / 1000.0, 1) AS TUND_WEIGHT_AT_CLOSE_TON
      FROM [CC2PRD].[CCM].[REF_HEAT_TUNDISH] AS rht
      INNER JOIN [CC2PRD].[CCM].[TUNDISH] AS t
          ON rht.TD_INSTALLATION_ID = t.TD_INSTALLATION_ID
      INNER JOIN [CC2PRD].[CCM].[HEAT] AS h
          ON rht.HEAT_ID = h.HEAT_ID
      WHERE h.HEAT_NAME = '${heatName}';
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Tundish:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Tundish');
  }
};
const getShroudInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT
      [HEAT_NAME],
      [SHROUD_TYPE],
      [SHROUD_HEAT_COUNTER]
      FROM [CC2PRD].[CCM].[V_REP_HEAT] WHERE [HEAT_NAME] ='${heatName}'
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Shroud:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Shroud');
  }
};

const getSteelLossInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT 
        h.HEAT_NAME,
        s.HEAT_ID,
        ROUND(s.OTHER_STEEL_LOSS /1000, 3) AS OTHER_STEEL_LOSS,
        ROUND(s.HEAD_CROP_WEIGHT_CUTTED /1000, 3) AS HEAD_CROP_WEIGHT_CUTTED,
        ROUND(s.TAIL_CROP_WEIGHT_CUTTED /1000, 3) AS TAIL_CROP_WEIGHT_CUTTED,
        ROUND(s.TUND_SKULL_WEIGHT /1000, 3) AS TUND_SKULL_WEIGHT,
        ROUND(s.CUT_LOSS_WEIGHT /1000, 3) AS CUT_LOSS_WEIGHT,
        ROUND(s.SAMPLE_WEIGHT /1000, 3) AS SAMPLE_WEIGHT
      FROM 
        [CC2PRD].[CCM].[V_REP_STEEL_LOSS] AS s
      INNER JOIN 
        [CC2PRD].[CCM].[V_REP_HEAT] AS h ON s.HEAT_ID = h.HEAT_ID
      WHERE h.HEAT_NAME = '${heatName}';
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Tundish:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Tundish');
  }
};


const getLadleDepartureInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT 
        HEAT_NAME,
        FORMAT([CC2PRD].[CCM].SYSTIME_TO_DISPTIME(OPEN_TIME), 'HH:mm') AS LADLE_OPEN_TIME,
        FORMAT([CC2PRD].[CCM].SYSTIME_TO_DISPTIME(CLOSE_TIME), 'HH:mm') AS LADLE_CLOSE_TIME,
        FORMAT([CC2PRD].[CCM].SYSTIME_TO_DISPTIME(DEPART_TIME), 'HH:mm') AS LADLE_DEPART_TIME,
        ROUND([CC2PRD].[CCM].INTERVAL_TO_SECONDS(OPEN_TIME, CLOSE_TIME) / 60.0, 0) AS POURING_DURATION,
        ROUND(LADLE_DEPART_WEIGHT / 1000.0, 1) AS LADLE_DEPART_WEIGHT,
        ROUND((LADLE_ARRIVE_WEIGHT - LADLE_DEPART_WEIGHT) / 1000.0, 1) AS LADLE_OUTPUT_WEIGHT
      FROM 
        [CC2PRD].[CCM].HEAT
      WHERE 
        HEAT_NAME = '${heatName}';
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Tundish:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Tundish');
  }
};


const getTundishMaterialInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT 
        MAX(CASE p.POWDER_TYPE WHEN 'TD_SLAG' THEN p.POWDER_NAME END) AS TD_SLAG_NAME,
        MAX(CASE p.POWDER_TYPE WHEN 'TD_INSUL.' THEN p.POWDER_NAME END) AS TD_INSUL_NAME,
        t.SPRAY_MATERIAL AS TUND_SPRAY_MATERIAL
      FROM 
        [CC2PRD].[CCM].REL_HEAT_POWDER p
      INNER JOIN 
        [CC2PRD].[CCM].HEAT h ON p.HEAT_ID = h.HEAT_ID
      LEFT JOIN 
        [CC2PRD].[CCM].REF_HEAT_TUNDISH rht ON h.HEAT_ID = rht.HEAT_ID
      LEFT JOIN 
        [CC2PRD].[CCM].TUNDISH t ON rht.TD_INSTALLATION_ID = t.TD_INSTALLATION_ID
      WHERE 
        h.HEAT_NAME = '${heatName}'
      GROUP BY 
        t.SPRAY_MATERIAL;
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Tundish:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Tundish');
  }
};

const getTundishTempSporadicInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT 
        [HEAT_NAME],
        FORMAT([MEASUREMENT_TIME], 'HH:mm') AS MEASUREMENT_TIME,
        ROUND(([MEASUREMENT_TEMPERATURE] - 273.15), 0) AS MEASUREMENT_TEMPERATURE,
        ROUND(([LIQUIDUS_TEMPERATURE] - 273.15), 0) AS LIQUIDUS_TEMPERATURE,
        ROUND(([MEASUREMENT_TEMPERATURE] - [LIQUIDUS_TEMPERATURE]), 0) AS SUPER_HEAT,
        [ANALYSIS_TYPE]
      FROM 
        [CC2PRD].[CCM].[V_REP_TUNDISH_MEASUREMENTS]
      WHERE 
        [HEAT_NAME] = '${heatName}'
        AND [ANALYSIS_TYPE] = 'AIM';
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Tundish:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Tundish Temp (Sporadic)');
  }
};

const getStrandDataInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT DISTINCT
        h.HEAT_ID,
        h.HEAT_NAME,
        hs.STRAND_NAME,
        hs.MOLD_NAME,
        FORMAT(ROUND(hs.MOLD_START_LENGTH*1.0, 2), 'N2') AS MOLD_START_LENGTH,
        FORMAT(ROUND(hs.MOLD_END_LENGTH*1.0, 2), 'N2') AS MOLD_END_LENGTH,
        FORMAT(hs.MOLD_START_TIME, 'HH:mm') AS MOLD_START_TIME,
        FORMAT(hs.MOLD_END_TIME, 'HH:mm') AS MOLD_END_TIME,
        ROUND(hs.DURATION/60.0, 0) AS DURATION,
        ROUND(hs.AVG_SPEED * 60.0, 2) AS AVG_SPEED,
        hs.L2_COOLING_PRACTICE,
        hs.OSCI_PRACTICE,
        hs.DYNAGAP_PRACTICE,
        hs.MLC_PRACTICE,
        m.THICKNESS,
        m.WIDTH_BOTTOM,
        CAST(CAST(ROUND(m.THICKNESS * 1000.0, 0) AS INT) AS VARCHAR) 
            + ' x ' + 
        CAST(CAST(ROUND(m.WIDTH_BOTTOM * 1000.0, 0) AS INT) AS VARCHAR) AS FORMAT,
        p.CASTING_POWDER_NAME,
        p.CASTING_POWDER_AMOUNT,
        s.SEN_TYPE,
        s.SEN_HEAT_COUNTER
      FROM 
        [CC2PRD].[CCM].[V_REP_HEAT] AS h
      INNER JOIN 
        [CC2PRD].[CCM].[V_REP_HEAT_STRAND] AS hs ON h.HEAT_ID = hs.HEAT_ID
      INNER JOIN 
        [CC2PRD].[CCM].[MOLD_FORMAT_LOG] AS m ON h.HEAT_ID = m.HEAT_ID AND hs.STRAND_NUMBER = m.STRAND_NUMBER
      INNER JOIN 
        [CC2PRD].[CCM].[V_REP_MOLD_POWDER_STRAND] AS p ON h.HEAT_ID = p.HEAT_ID AND hs.STRAND_NUMBER = p.STRAND_NUMBER
      INNER JOIN 
        [CC2PRD].[CCM].[V_REP_SEN_STRAND] AS s ON h.HEAT_ID = s.HEAT_ID AND hs.STRAND_NUMBER = s.STRAND_NUMBER
      WHERE
        h.HEAT_NAME = '${heatName}';
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Strand Data:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Strand Data');
  }
};

const getAnalysisDataInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT
        HEAT_NAME,
        CASE
          WHEN ORDER_BY = 1 THEN 'MIN'
          WHEN ORDER_BY = 2 THEN 'AIM'
          WHEN ORDER_BY = 3 THEN 'MAX'
          ELSE DISPLAY_NAME
        END AS Sample,
        CASE
          WHEN ORDER_BY IN (1, 2, 3) THEN NULL
          ELSE FORMAT(ANALYSING_TIME, 'HH:mm')
        END AS [Time],
        CASE
          WHEN ORDER_BY IN (1, 2, 3) THEN NULL
          ELSE PERITECTIC
        END AS Peri,
        C, MN, P, S, SI, CU, NI, CR, AL, MO, SN, NB, V, TI, B, CA, N
      FROM [CC2PRD].[CCM].[V_REP_ANALYSIS]
      WHERE
        HEAT_NAME = '${heatName}';
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Analysis Data:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Analysis Data');
  }
};

const getSlabDataInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT 
        p.HEAT_ID,
        h.HEAT_NAME,
        p.STRAND_NUMBER + 2 AS STRAND_NUMBER,
        p.MARKING_NUMBER,
        p.PRODUCT_NAME,
        CAST(p.ACTUAL_LENGTH_COLD*1000 AS DECIMAL(10,0)) AS ACTUAL_LENGTH_COLD,
        CAST(p.LENGTH_AIM*1000 AS DECIMAL(10,0)) AS LENGTH_AIM,
        CAST(p.LENGTH_MIN*1000 AS DECIMAL(10,0)) AS LENGTH_MIN,
        CAST(p.LENGTH_MAX*1000 AS DECIMAL(10,0)) AS LENGTH_MAX,
        CAST(p.WIDTH_FRONT_COLD*1000 AS DECIMAL(10,0)) AS WIDTH_FRONT_COLD,
        CAST(p.WIDTH_BACK_COLD*1000 AS DECIMAL(10,0)) AS WIDTH_BACK_COLD,
        CAST(p.THICKNESS_COLD*1000 AS DECIMAL(10,0)) AS THICKNESS_COLD,
        CAST(p.WEIGHT_CALCULATED/1000 AS DECIMAL(10,2)) AS WEIGHT_CALCULATED,
        CAST(p.WEIGHT_MEASURED/1000 AS DECIMAL(10,2)) AS WEIGHT_MEASURED,
        FORMAT(p.CUTTING_TIME, 'HH:mm') AS CUTTING_TIME,
        p.CUTTING_MODE,
        p.SAMPLE_CUT,
        p.QUALITY_RESULT_SURFACE,
        p.QUALITY_RESULT_INTERN,
        p.SLAB_DESTINATION
      FROM [CC2PRD].[CCM].[V_REP_PRODUCTS] AS p
      INNER JOIN [CC2PRD].[CCM].[V_REP_HEAT] AS h 
        ON p.HEAT_ID = h.HEAT_ID
      WHERE
        HEAT_NAME = '${heatName}';
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Slab Data:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Slab Data');
  }
};


const getSlabSectionDataInfo = async (req, res) => {
  const { heatName } = req.params;
  try {
    const db = await connectCcm2Db();
    const result = await db.query(`
      SELECT 
        s.HEAT_ID,
        h.HEAT_NAME,
        (s.STRAND_NUMBER + 2) AS STRAND_NUMBER,
        s.PRODUCT_NAME,
        s.ENTRY_TYPE,
        s.START_POSITION,
        s.SECTION_LENGTH
      FROM [CC2PRD].[CCM].[V_REP_PRODUCTS_SECTIONS] AS s
      INNER JOIN [CC2PRD].[CCM].[V_REP_HEAT] AS h
        ON s.HEAT_ID = h.HEAT_ID
      WHERE
        HEAT_NAME = '${heatName}';
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('❌ Lỗi truy vấn Slab Section Data:', err);
    res.status(500).send('Lỗi truy vấn dữ liệu phần Slab Section Data');
  }
};


const exportSlabWeightByMonth = async (req, res) => {
  try {
    const db = await connectCcmMySQL();

    const [rows] = await db.query(`
      SELECT 
        YEAR(CUT_TIME) AS year,
        MONTH(CUT_TIME) AS month,
        SUM(WEIGHT_ACT) AS total_weight
      FROM ccm_db.ccm_heat_report_slab_data
      WHERE YEAR(CUT_TIME) = (
        SELECT MAX(YEAR(CUT_TIME)) 
        FROM ccm_db.ccm_heat_report_slab_data
      )
      GROUP BY YEAR(CUT_TIME), MONTH(CUT_TIME)
      ORDER BY year, month;
    `);

    res.json(rows);
    console.log(res.json(rows));
  } catch (error) {
    console.error("❌ Error in exportSlabWeightByMonth:", error);
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu slab weight by month" });
  }
};


module.exports = {
  getGeneralInfo,
  getGeneralSectionInfo,
  getLadleSectionInfo,
  getLadleArrivalInfo,
  getTundishInfo,
  getShroudInfo,
  getSteelLossInfo,
  getLadleDepartureInfo,
  getTundishMaterialInfo,
  getTundishTempSporadicInfo,
  getStrandDataInfo,
  getAnalysisDataInfo,
  getSlabDataInfo,
  getSlabSectionDataInfo,
  exportSlabWeightByMonth
};
