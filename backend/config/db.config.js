require('dotenv').config();

// module.exports = {
//   HOST: process.env.DB_HOST,
//   USER: process.env.DB_USERNAME,
//   PASSWORD: process.env.DB_PASSWORD,
//   DB: process.env.DB_NAME,
//   dialect: "postgres",
//   port: process.env.DB_PORT, 
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };

module.exports = {
  URL: process.env.DATABASE_URL,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}