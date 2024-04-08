const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.users;
const Role = db.roles;

const userController = {
    createUser: async (req, res) => {
        try {
            const { username, nombre, apellidoPaterno, apellidoMaterno, correo, numeroTelefonico, password, fechaNacimiento, roleId } = req.body;
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = await User.create({
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
            res.status(201).send(newUser);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            await User.destroy({ where: { id: userId } });
            res.send({ message: 'Usuario eliminado con éxito.' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    
    updateUser: async (req, res) => {
        try {
            const { userId } = req.params;
            let updatedData = req.body;
    
            if (updatedData.password) {
                const hashedPassword = await bcrypt.hash(updatedData.password, 8);
                updatedData.password = hashedPassword;
            }
    
            const updatedUser = await User.update(updatedData, { where: { id: userId } });
    
            res.send({ message: 'Usuario actualizado con éxito.' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },

    fetchUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                include: [{
                    model: Role,
                    as: 'role',
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            });
            res.status(200).send(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).send({ message: error.message });
        }
    },

    fetchUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.userId, { include: Role });
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send({ message: "Usuario no encontrado." });
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },

    fetchUserByEmail: async (req, res) => {
        try {
            const user = await User.findOne({ where: { correo: req.params.email }, include: Role });
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send({ message: "Usuario no encontrado." });
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

};

module.exports = userController;
