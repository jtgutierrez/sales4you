const Sequelize = require("sequelize");
const db = require("../db");

const Company = db.define("company", {
  E_mail: {
    type: Sequelize.STRING,
    validate: { isEmail: true }
  },
  Company: {
    type: Sequelize.STRING
  },
  Lattitude: {
    type: Sequelize.FLOAT
  },
  Longitude: {
    type: Sequelize.FLOAT
  },
  Discount: {
    type: Sequelize.INTEGER
  }
});

module.exports = Company;
