const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.SQL_URI)

module.exports = db