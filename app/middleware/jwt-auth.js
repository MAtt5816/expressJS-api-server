const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'your-secret-key';


const signJWT = (username, expiresIn) => {
    return jwt.sign({username}, JWT_SECRET, {expiresIn: expiresIn})
}

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(401);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    signJWT,
    authenticateJWT
}