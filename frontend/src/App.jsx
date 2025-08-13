// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./routes/routes";
import Header from "./components/layout/Header";

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
}

export default App;
