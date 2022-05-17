const Sequelize = require('sequelize')
const db = new Sequelize('tldb', 'mbird', 'frenchlick', {
    host: 'localhost',
    dialect:'postgres',
    port:5432
  });
module.exports = db;