import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Gọi API export để backend truy vấn và ghi file JSON
    fetch("http://localhost:5000/api/heat-report/export-slab-chart")
      .then(() => {
        // Sau khi export xong, lấy dữ liệu từ file json
        fetch("http://localhost:5000/api/heat-report/slab-chart-data")
          .then(res => res.json())
          .then(setData)
          .catch(() => setData([]));
      });
  }, []);

  return (
    <div className="home-container">
      <h2>Biểu đồ khối lượng slab đúc theo ngày</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" label={{ value: "Ngày", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "Khối lượng (tấn)", angle: -90, position: "insideLeft", fontSize: 14, fontWeight: "bold", color: "#2c5282" }} />
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
