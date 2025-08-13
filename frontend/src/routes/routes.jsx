// src/routes/routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import tất cả page
import Home from "../pages/Home";

// CCM pages
import CCMHome from "../pages/ccm/CCMHome";
import HeatReport from "../pages/ccm/HeatReport";
import QualityReport from "../pages/ccm/QualityReport";
import ShiftReport from "../pages/ccm/ShiftReport";

// HSM pages
import ProductionCoil from "../pages/hsm/ProductionCoil";

// RHF pages
import SlabDischarged from "../pages/rhf/SlabDischarged";

const routes = [
  { path: '/ccm', element: <CCMHome /> },
  { path: '/heat-report', element: <HeatReport /> },
  // ... thêm các route khác nếu cần
]

const AppRoutes = () => (
  <Routes>
    {/* Home */}
    <Route path="/" element={<Home />} />

    {/* CCM */}
    <Route path="/ccm" element={<CCMHome />} />
    <Route path="/ccm/heat-report" element={<HeatReport />} />
    <Route path="/ccm/quality-report" element={<QualityReport />} />
    <Route path="/ccm/shift-report" element={<ShiftReport />} />

    {/* HSM */}
    <Route path="/hsm/production-coil" element={<ProductionCoil />} />

    {/* RHF */}
    <Route path="/rhf/slab-discharged" element={<SlabDischarged />} />
  </Routes>
);

export default AppRoutes;
