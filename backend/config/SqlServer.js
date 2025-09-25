const sqlServer = require('mssql');

const ccm2DbConfig = {
  user: 'sa',
  password: '123456',
  server: 'localhost',
  database: 'CC2PRD',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

const connectCcm2Db = async () => {
  try {
    await sqlServer.connect(ccm2DbConfig);
    return sqlServer;
  } catch (err) {
    throw new Error('❌ Can not connect to sqlServer: ' + err.message);
  }
};

module.exports = connectCcm2Db;