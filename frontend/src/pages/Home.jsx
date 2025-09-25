// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Gọi API backend để lấy dữ liệu slab weight theo tháng
    fetch("http://localhost:5000/api/heat-report/slab-weight-by-month/")
      .then(res => res.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);
  console.log(data, "******************")
  return (
    <div className="home-container">
      <h2>Biểu đồ khối lượng slab đúc theo tháng (năm mới nhất)</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{ value: "Tháng", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              label={{
                value: "Khối lượng (tấn)",
                angle: -90,
                position: "insideLeft",
                fontSize: 14,
                fontWeight: "bold",
                color: "#2c5282"
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_weight" fill="#2976d2" name="Khối lượng slab" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Home;
