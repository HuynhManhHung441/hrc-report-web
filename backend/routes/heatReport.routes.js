const express = require('express');
const router = express.Router();
const heatController = require('../controllers/heatReport.controller');

router.get('/general-info/:heatName', heatController.getGeneralInfo);
router.get('/general-section/:heatName', heatController.getGeneralSectionInfo);
router.get('/ladle-section/:heatName', heatController.getLadleSectionInfo);
router.get('/ladle-arrival/:heatName', heatController.getLadleArrivalInfo);
router.get('/tundish/:heatName', heatController.getTundishInfo);
router.get('/shroud-section/:heatName', heatController.getShroudInfo);
router.get('/steel-loss-section/:heatName', heatController.getSteelLossInfo);
router.get('/ladle-departure-section/:heatName', heatController.getLadleDepartureInfo);
router.get('/tundish-material-section/:heatName', heatController.getTundishMaterialInfo);
router.get('/tundish-temp-sporadic/:heatName', heatController.getTundishTempSporadicInfo);
router.get('/strand-data-section/:heatName', heatController.getStrandDataInfo);
router.get('/analysis-data-section/:heatName', heatController.getAnalysisDataInfo);
router.get('/slab-data/:heatName', heatController.getSlabDataInfo);
router.get('/slab-section-data/:heatName', heatController.getSlabSectionDataInfo);
router.get('/export-slab-chart', heatController.exportSlabWeightByDate);
router.get('/slab-chart-data', (req, res) => {
  const path = require('path');
  res.sendFile(path.join(__dirname, '../data/slab_chart_data.json'));
});

module.exports = router;