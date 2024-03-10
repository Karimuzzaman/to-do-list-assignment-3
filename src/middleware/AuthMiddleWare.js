const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    let token = req.headers['token'];

    jwt.verify(token, "abc-xyz-123", (err, decodedData) => {
        if (err) {
            res.status(401).json({ message: "Unauthorized" })
        }
        else {

            let email = decodedData['data'];
            req.headers.email = email;
            next();

        }
    })
}