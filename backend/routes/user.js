
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, userController.createUser);
router.put("/edit/:userId", authMiddleware, userController.updateUser);
router.delete("/delete/id/:userId", authMiddleware, userController.deleteUser);
router.get("/id/:userId", authMiddleware, userController.fetchUserById);
router.get("/all", authMiddleware, userController.fetchUsers);
router.get("/email/:email", authMiddleware, userController.fetchUserByEmail);


module.exports = (app) => {
    app.use("/api/users", router);
};