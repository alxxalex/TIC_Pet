const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    try {
        const user = jwt.verify(req.cookies.jwtToken, "YWxleGFuZHJ1")
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie('jwtToken');
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
}

module.exports = { validateToken };