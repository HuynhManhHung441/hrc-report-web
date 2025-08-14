const express = require('express');
const cors = require('cors');
const heatReportRoutes = require('./routes/heatReport.routes');

const app = express();
const port = 5000;

app.use(cors());
app.use('/api/heat-report', heatReportRoutes);

app.listen(port, () => {
  console.log(`✅ Backend đang chạy tại http://localhost:${port}`);
});
