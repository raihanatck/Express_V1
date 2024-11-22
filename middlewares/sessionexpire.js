const jwt = require('jsonwebtoken');
const SECRET_KEY = "CONTACTAPI";

const verifyTokenMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from headers

    if (!token) {
        return res.status(401).json({ Message: "Access denied. No token provided." });
    }

    // Verify the token and check if it is expired
    try {
        const decoded = jwt.verify(token, SECRET_KEY);  // This will check for expiration automatically
        req.user = decoded;  // You can use decoded data for authorization
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ Message: "Invalid or expired token. Please log in again." });
    }
};

module.exports = verifyTokenMiddleware;
