
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = db.users;
const Role = db.roles;

exports.register = async (req, res) => {
    const { username, nombre, apellidoPaterno, apellidoMaterno, correo, numeroTelefonico, password, fechaNacimiento, roleId } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await User.create({
            username,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            correo,
            numeroTelefonico,
            password: hashedPassword,
            fechaNacimiento,
            roleId
        });

        res.status(201).send({ message: "Usuario registrado" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                correo: req.body.email
            }
        });

        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ accessToken: null, message: "Contraseña invalida" });
        }

        //? Uso de la secret key aqui para evitar usar un archivo .env
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', {
            expiresIn: 86400});

        res.status(200).send({
            nombre: user.nombre,
            correo: user.correo,
            accessToken: token,
            rol: user.roleId
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
