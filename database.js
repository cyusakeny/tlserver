const Sequelize = require('sequelize')
const db = new Sequelize('d1fal5qid7h6fr', 'xxbjyxhxyqzwqw', '7dfc876ad0148d3d15e0ec6c446e3fa5965585a60e65b25bae925b3d7d3dbb44', {
    host: 'ec2-34-197-84-74.compute-1.amazonaws.com',
    dialect:'postgres',
    port:5432,
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  });
module.exports = db;
