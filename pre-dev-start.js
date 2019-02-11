const path = require('path');
const fs = require('fs');
require('dotenv/config');

(() => {
  const configPath = path.join(__dirname, 'falcon-config.json');
  console.log('configured path', configPath);

  if (process.env.NODE_ENV === 'test') {
    module.exports = {
      dbUrl: `${process.env.DB_URL}-test`,
      dbName: `${process.env.DB_NAME}-test`,
    }
  } else {
    module.exports = {
      dbUrl: process.env.DB_URL,
      dbName: process.env.DB_NAME,
    }
  }
})()
