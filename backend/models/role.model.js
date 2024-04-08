
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'roles',
    }
    );
    return Role;
};
