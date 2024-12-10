const jwt = require('jsonwebtoken');

const createToken = (userData) => {
    try {
        const token = jwt.sign(
            { id: userData.id, email: userData.email },
            process.env.JWT_SECRET || "defaultSecret",
            { expiresIn: '1h' }
        );
        return token;
    } catch (err) {
        throw new Error("Error creating token: " + err.message);
    }
};

const validateJwtToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { createToken, validateJwtToken };
