const sql = require('mssql');

const dbConfig = {
  user: 'sa',
  password: '123456',
  server: 'localhost',
  database: 'CC2PRD',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    return sql;
  } catch (err) {
    throw new Error('❌ Không thể kết nối SQL Server: ' + err.message);
  }
};

module.exports = connectDB;