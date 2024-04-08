
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellidoPaterno: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellidoMaterno: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        numeroTelefonico: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fechaNacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id',
            },
        },
    });

    return User;
};
