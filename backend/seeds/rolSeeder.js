const db = require("../models");

const Role = db.roles;

const roleSeed = async () => {
    try {
        await Role.bulkCreate([
            { nombre: "admin", descripcion: "Administrador del sistema" },
            { nombre: "user", descripcion: "Usuario estándar" }
        ]);

        console.log("Roles agregados exitosamente");
    } catch (error) {
        console.error("Error al agregar roles: ", error);
    }
};

roleSeed();
