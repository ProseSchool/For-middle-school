require('dotenv').config();
const env = process.env;

const development = {
    username: env.SQLUSERNAME,  
    password: env.SQLPASSWORD,
    database: env.SQLDATABASE,
    dialect: env.SQLDIALECT,
    host: env.SQLHOST
  };

module.exports = development;
