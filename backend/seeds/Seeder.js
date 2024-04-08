const db = require("../models");
const bcrypt = require("bcryptjs");

const mainSeeder = async () => {
    const Role = db.roles;
    const User = db.users;

    // Agregando roles
    try {
        await Role.bulkCreate([
            { nombre: "admin", descripcion: "Administrador del sistema" },
            { nombre: "user", descripcion: "Usuario estándar" }
        ]);
        console.log("Roles agregados exitosamente");
    } catch (error) {
        console.error("Error al agregar roles: ", error);
        return; 
    }

    const hashedPassword = await bcrypt.hash("123456", 8);
    const users = [
        {
            nombre: "Admin",
            apellidoPaterno: "Admin",
            apellidoMaterno: "Admin",
            correo: "admin@mail.com",
            numeroTelefonico: "1234567890",
            password: hashedPassword,
            fechaNacimiento: "2000-01-01",
            roleId: 1 
        },
        {
            nombre: "User",
            apellidoPaterno: "User",
            apellidoMaterno: "User",
            correo: "user@mail.com",
            numeroTelefonico: "1234567890",
            password: hashedPassword,
            fechaNacimiento: "2000-01-01",
            roleId: 2
        }
    ];

    try {
        for (const user of users) {
            await User.create(user);
        }
        console.log("Usuarios agregados exitosamente");
    } catch (error) {
        console.error("Error al agregar usuarios: ", error);
    }
};

mainSeeder();
