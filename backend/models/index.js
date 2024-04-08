
const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);
db.roles = require('./role.model.js')(sequelize, Sequelize);

db.roles.hasMany(db.users, { as: "users" });
db.users.belongsTo(db.roles, {
    foreignKey: "roleId",
    as: "role",
});

module.exports = db;
