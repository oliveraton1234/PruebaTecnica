
const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.URL , {
    dialect: dbConfig.dialect,

    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize.sync({ force: false }).then(() => {
        console.log("Base de datos sincronizada");
    }).catch((error) => {
        console.error("Error al sincronizar la base de datos:", error);
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
