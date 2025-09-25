
// db/mysqlConnect.js
const mySql = require('mysql2/promise');

// Cấu hình MySQL
const dbConfig = {
  host: 'localhost',     // hoặc IP server MySQL
  user: 'root',
  password: 'Hung441$',
  database: 'ccm_db',
  port: 3306,            // mặc định của MySQL
};

// Hàm kết nối
const connectCcmMySQL = async () => {
  try {
    const connection = await mySql.createConnection(dbConfig);
    console.log('✅ Connect to MySQL successfully');
    return connection;
  } catch (err) {
    throw new Error('❌ Can not connect to MySQL: ' + err.message);
  }
};

module.exports = connectCcmMySQL;