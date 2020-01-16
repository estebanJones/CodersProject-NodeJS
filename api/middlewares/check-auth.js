const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = JWT.verify(token, process.env.JWT.KEY);

        req.userData = decode;
        next();
    } catch(err) {
        req.status(401).json({
            message: "Auth failed !"
        });
    }
};