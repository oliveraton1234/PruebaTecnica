module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Galle1639",
  DB: "userscrud",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
