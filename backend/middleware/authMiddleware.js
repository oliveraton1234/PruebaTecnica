const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        //? Uso de la secret key aqui para evitar usar un archivo .env
        const decoded = jwt.verify(token.split(" ")[1], 'your_jwt_secret'); 
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
