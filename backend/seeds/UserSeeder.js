
const db = require("../models");
const bcrypt = require("bcryptjs");

const UserSeeder = async () => {
    const hashedPassword = await bcrypt.hash("123456", 8);
    const users = [
        {
            nombre: "Admin",
            apellidoPaterno: "Admin",
            apellidoMaterno: "Admin",
            correo: "admin@mail.com",
            numeroTelefonico: 1234567890,
            password: hashedPassword,
            fechaNacimiento: "2000-01-01",
            roleId: 1
        },
        {
            nombre: "User",
            apellidoPaterno: "User",
            apellidoMaterno: "User",
            correo: "user@mail.com",
            numeroTelefonico: 1234567890,
            password: hashedPassword,
            fechaNacimiento: "2000-01-01",
            roleId: 2
        }
    ];

    try {
        for (const user of users) {
            await db.users.create(user);
        }
        console.log("Usuario agregado exitosamente");
    } catch (error) {
        console.error("Error al agregar usuario: ", error);
    }
};

UserSeeder();
