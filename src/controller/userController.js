const UsersModel = require("../model/UsersModel");
const jwt = require("jsonwebtoken")

exports.registration = async (req, res) => {
    try {
        let reqBody = req.body;
        await UsersModel.create(reqBody);
        res.json({ status: "success", message: "Registration Completed" })
    } catch (error) {

        res.json({ status: "failed", message: "Registration Failed" })
    }
}


exports.login = async (req, res) => {
    try {
        let reqBody = req.body;
        let user = await UsersModel.find(reqBody)
        if (user.length > 0) {

            let payLoad = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: reqBody['email'] };
            let token = jwt.sign(payLoad, "abc-xyz-123");
            res.json({ status: "success", message: "user found", token: token })

        }
        else {
            res.json({ status: "failed", message: "User not found" })

        }

        //res.json({ status: "success", message: user })

    } catch (error) {
        res.json({ status: "failed", message: "Login Failed" })
    }
}

exports.profileDetail = async (req, res) => {

    try {
        let email = req.headers['email'];
        let user = await UsersModel.find({ email: email });
        res.json({ status: "success", message: user })

    } catch (error) {
        res.json({ status: "fail", message: error })
    }

}


exports.profileUpdate = async (req, res) => {

    try {
        let email = req.headers['email'];
        let reqBody = req.body;
        await UsersModel.updateOne({ email: email }, reqBody)
        res.json({ status: "success", message: "update completed" })

    } catch (error) {

        res.json({ status: "fail", message: "update failed" })

    }

}